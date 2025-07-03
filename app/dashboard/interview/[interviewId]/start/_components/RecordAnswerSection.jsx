'use client';

import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { generateInterviewQAStream } from "@/utils/GeminiAiModel";
import { userAnswer as userAnswerTable } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { Mic, Webcam as WebcamIcon } from "lucide-react";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import useSpeechToText from 'react-hook-speech-to-text';
import Webcam from "react-webcam";
import { toast } from "sonner";

function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {
  const [userAnswer, setUserAnswer] = useState('');
  const [finalTranscript, setFinalTranscript] = useState('');
  const [loading, setLoading] = useState(false);
  const transcriptRef = useRef('');
  const previousTranscriptCount = useRef(0); // track processed transcripts

  const { user } = useUser();

  const {
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  // Live update transcript
  useEffect(() => {
    if (!isRecording) return;

    const newSegments = results.slice(previousTranscriptCount.current);
    if (newSegments.length > 0) {
      const newText = newSegments.map(r => r.transcript).join(' ');
      transcriptRef.current += ' ' + newText;
      previousTranscriptCount.current = results.length;
      setUserAnswer(transcriptRef.current.trim());
    }
  }, [results, isRecording]);

  const toggleRecording = () => {
    if (isRecording) {
      stopSpeechToText();
      setTimeout(() => {
        setFinalTranscript(transcriptRef.current.trim());
        toast.info("Recording stopped. You can now submit your answer.");
      }, 500);
    } else {
      // Reset everything for new recording
      transcriptRef.current = '';
      previousTranscriptCount.current = 0;
      setUserAnswer('');
      setFinalTranscript('');
      startSpeechToText();
    }
  };

  const SubmitAnswer = async () => {
    if (finalTranscript.length < 10) {
      toast.error('Answer too short. Please speak longer or more clearly.');
      return;
    }

    const feedbackPrompt = `
      Question: ${mockInterviewQuestion?.[activeQuestionIndex]?.question}
      User Answer: ${finalTranscript}
      Based on the question and answer, give a rating (1-5) and 3–5 lines of constructive feedback in JSON format.
      Format: {"rating": 4, "feedback": "Good explanation. Be more specific about performance challenges."}
    `;

    try {
      setLoading(true);

      const response = await generateInterviewQAStream(feedbackPrompt);
      const cleanedResponse = response.replace(/```json|```/g, '').trim();
      const json = JSON.parse(cleanedResponse);

      await db.insert(userAnswerTable).values({
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestion?.[activeQuestionIndex]?.question,
        correctAns: mockInterviewQuestion?.[activeQuestionIndex]?.answer,
        userAns: finalTranscript,
        feedback: json?.feedback,
        rating: json?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format('DD-MM-YYYY')
      });

      toast.success("Answer saved and feedback generated successfully!");
    } catch (err) {
      console.error("Error in Gemini/DB insert:", err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col items-center justify-center my-7 p-10 rounded-lg border bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg">
        <WebcamIcon className="w-10 h-10 mb-4" />
        <h2 className="text-2xl font-semibold mb-4">Live Interview Camera</h2>
        <p className="text-sm mb-6 text-center">Please ensure your face is clearly visible in the webcam feed below.</p>

        <Webcam
          audio={false}
          mirrored
          screenshotFormat="image/jpeg"
          videoConstraints={{
            width: 300,
            height: 200,
            facingMode: "user",
          }}
          className="rounded-lg border-2 border-white shadow-md"
          style={{ width: 300, height: 200, zIndex: 10 }}
        />

        <p className="text-sm text-white mt-3 text-center max-w-sm">
          <strong>Live Transcript:</strong> {userAnswer || "Waiting for your response..."}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <Button onClick={toggleRecording} className="w-48" disabled={loading}>
          {isRecording ? (
            <span className="text-red-600 flex items-center gap-2">
              <Mic /> Stop Recording
            </span>
          ) : loading ? (
            "Please wait..."
          ) : (
            "Record Answer"
          )}
        </Button>

        <Button
          onClick={SubmitAnswer}
          variant="secondary"
          className="w-48"
          disabled={loading || !finalTranscript}
        >
          Submit Answer
        </Button>
      </div>
    </div>
  );
}

export default RecordAnswerSection;
