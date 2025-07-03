"use client";

import { Button } from "@/components/ui/button";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { db } from "@/utils/db";
import { userAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { ChevronsUpDown } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Feedback() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [feedbackList, setFeedbackList] = useState([]);
  const router=useRouter();

  useEffect(() => {
    if (params?.interviewId) {
      GetFeedback(params.interviewId);
    }
  }, [params.interviewId]);

  const GetFeedback = async (interviewIdRaw) => {
    const interviewId = String(interviewIdRaw).trim();

    try {
      const result = await db
        .select()
        .from(userAnswer)
        .where(eq(userAnswer.mockIdRef, interviewId))
        .orderBy(userAnswer.id);

      console.log("✅ Filtered Results:", result);
      setFeedbackList(result);
    } catch (err) {
      console.error("❌ Error fetching feedback:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold text-green-500">Congratulations!</h2>
      <h2 className="font-bold text-2xl mt-2">Here is your interview feedback</h2>
      <p className="text-sm text-gray-500 mb-4">
        Below are the interview questions with the correct answer, your answer, and feedback for improvement.
      </p>

      {loading ? (
        <p className="text-gray-400">Loading feedback...</p>
      ) : feedbackList.length === 0 ? (
        <p className="text-gray-500">No feedback available for this interview.</p>
      ) : (
        feedbackList.map((item, index) => (
          <Collapsible key={index} className="mb-4 border rounded-lg overflow-hidden shadow-sm">
            <CollapsibleTrigger className="p-3 bg-secondary flex justify-between items-center w-full text-left font-medium gap-7">
              <span className="text-base">{item.question}</span>
              <ChevronsUpDown className="h-5 w-5" />
            </CollapsibleTrigger>
            <CollapsibleContent className="bg-gray-50 p-4 text-sm space-y-2">
              <p className="border rounded-lg bg-green-50 text-green-900"><strong>✅ Correct Answer:</strong> {item.correctAns}</p>
              <p className="border rounded-lg bg-red-50 text-red-900"><strong>🧑 Your Answer:</strong> {item.userAns}</p>
              <p className="border rounded-lg bg-blue-50 text-blue-900"><strong>💬 Feedback:</strong> {item.feedback}</p>
              <p className="text-red-500 p-2 border rounded-lg"><strong>⭐ Rating:</strong> {item.rating} / 5</p>
            </CollapsibleContent>
          </Collapsible>
        ))
      )}
      <Button onClick={()=>router.replace('/dashboard')}>Go Home</Button>
    </div>
  );
}

export default Feedback;