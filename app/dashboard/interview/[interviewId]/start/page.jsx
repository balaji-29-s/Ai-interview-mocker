"use client";

import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import dynamic from 'next/dynamic';
import Link from "next/link";
import React, { useEffect, useState } from "react";
import QuestionsSection from "./_components/QuestionsSection";

const RecordAnswerSection = dynamic(
  () => import('./_components/RecordAnswerSection'),
  { ssr: false } // disables server-side rendering
);


function StartInterview({ params }) {
  const { interviewId } = React.use(params);

  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState(null);
  const[activeQuestionIndex,setActiveQuestionIndex]=useState(0);

  useEffect(() => {
    if (interviewId) {
      GetInterviewDetails();
    }
  }, [interviewId]);

  const GetInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, interviewId));

      if (result.length > 0) {
        const jsonMockResp = JSON.parse(result[0].jsonMockResp);
        console.log(jsonMockResp)
        setMockInterviewQuestion(jsonMockResp);
        setInterviewData(result[0]);
      } else {
        console.warn("No interview data found");
      }
    } catch (error) {
      console.error("Error fetching interview:", error);
    }
  };

  return (
    <div>
        <div className="grid grid-cols-1 md:grid-cols-2  gap-10">
            <QuestionsSection
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
            />
            <RecordAnswerSection
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
            interviewData={interviewData}
            />
        </div>
        <div className='flex justify-end gap-6'>
          {activeQuestionIndex>0 &&
          <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button>}
          {activeQuestionIndex!=mockInterviewQuestion?.length-1&&
          <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>}
          {activeQuestionIndex==mockInterviewQuestion?.length-1&& 
          <Link href={'/dashboard/interview/'+interviewData?.mockId+"/feedback"}>
          <Button>End Interview</Button>
          </Link>}
        </div>
    </div>
  );
}

export default StartInterview;
