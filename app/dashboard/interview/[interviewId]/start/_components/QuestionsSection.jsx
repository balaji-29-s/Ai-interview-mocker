'use client';

import { Lightbulb, Volume2 } from "lucide-react";
import { useState } from "react";

function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex }) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const textToSpeech = (text) => {
    if (typeof window !== "undefined" && 'speechSynthesis' in window) {
      const synth = window.speechSynthesis;

      if (synth.speaking) {
        synth.cancel();
        setIsSpeaking(false);
        return;
      }

      if (text) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.oncancel = () => setIsSpeaking(false);
        synth.speak(utterance);
      }
    } else {
      alert('Text-to-speech is not supported in this environment.');
    }
  };

  return mockInterviewQuestion && (
    <div className="p-5 border rounded-lg">
      {/* Grid of question numbers */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 mb-5">
        {mockInterviewQuestion.map((questionObj, index) => (
          <div key={questionObj.question + index}>
            <h2
              className={`p-2 rounded-full font-semibold text-xs md:text-sm text-center cursor-pointer
                ${activeQuestionIndex === index ? 'bg-primary text-white' : 'bg-secondary'}`}
            >
              Question #{index + 1}
            </h2>
          </div>
        ))}
      </div>

      {/* Display the active question */}
      <div className="mt-4">
        <h2 className="my-5 text-md md:text-lg font-semibold text-center">
          {mockInterviewQuestion[activeQuestionIndex]?.question || "No question selected"}
        </h2>

        <div className="flex justify-center items-center gap-3 my-2">
          <Volume2
            className="w-8 h-8 text-primary cursor-pointer hover:scale-110 transition-transform"
            onClick={() => textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question || '')}
          />
          {isSpeaking && <span className="text-sm text-red-600 animate-pulse">Speaking...</span>}
        </div>
      </div>


      {/* Note section */}
      <div className="border rounded-lg p-5 bg-blue-100 mt-20">
        <h2 className="flex gap-2 items-center text-blue-600">
          <Lightbulb />
          <strong>Note:</strong>
        </h2>
        <h2 className="text-sm text-blue-700 my-2">
          {process.env.NEXT_PUBLIC_QUESTION_NOTE}
        </h2>
      </div>
    </div>
  );
}

export default QuestionsSection;
