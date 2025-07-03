"use client";

import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";

function InterviewList() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      GetInterviewList(user.primaryEmailAddress.emailAddress);
    }
  }, [user]);

  const GetInterviewList = async (email) => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.createdBy, email))
        .orderBy(desc(MockInterview.id));

      console.log("🎯 Fetched interviews:", result);
      setInterviewList(result);
    } catch (err) {
      console.error("❌ Error fetching interviews:", err);
    }
  };

  return (
    <div className="mt-6">
      <h2 className="font-semibold text-xl mb-4">Previous Mock Interviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
        {interviewList&&interviewList.map((interview,index)=>(
            <InterviewItemCard 
            interview={interview}
            key={index}/>
        ))}
      </div>
    </div>
  );
}

export default InterviewList;
