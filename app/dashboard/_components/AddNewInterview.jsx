"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { LoaderCircle } from "lucide-react";
import moment from "moment/moment";
import { useRouter } from "next/navigation"; // ✅ App Router compatible
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

function AddNewInterview() {
  const [openDialog, setOpenDailog] = useState(false);
  const [jobPosition,setJobPosition]=useState();
  const [jobDesc,setJobDesc]=useState();
  const [jobExperience,setJobExperience]=useState();
  const [loading,setLoading]=useState(false);
  const [jsonResponse,setJsonResponse]=useState([]);
  const {user}=useUser();
  const router=useRouter();
  const onSubmit = async (e) => {
    setLoading(true);
  e.preventDefault();

  console.log(jobPosition, jobDesc, jobExperience);

  const prompt = `jobPosition: ${jobPosition}, jobDescription: ${jobDesc}, Years of Experience: ${jobExperience}.
  Based on the above, generate ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions along with their answers in JSON format.
  The JSON should have an array of objects with "question" and "answer" fields.`;

  try {
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY); // Make sure this is in your .env file
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // or "gemini-2.0" if you want

    const chat = model.startChat(); // Start a chat session
    const result = await chat.sendMessage(prompt);
    const MockJsonResp=(result.response.text()).replace('```json','').replace('```','')
    console.log(JSON.parse(MockJsonResp));
    setJsonResponse(MockJsonResp);
    if(MockJsonResp)
    {
    const resp=await db.insert(MockInterview)
    .values({
      mockId:uuidv4(),
      jsonMockResp:MockJsonResp,
      jobPosition:jobPosition,
      jobDesc:jobDesc,
      jobExperience:jobExperience,
      createdBy:user?.primaryEmailAddress?.emailAddress,
      createdAt:moment().format('DD-MM-YYYY')

    }).returning({mockId:MockInterview.mockId});
    console.log("Inserted ID:",resp)
    if(resp){
      setOpenDailog(false);
      router.push(`/dashboard/interview/${resp[0]?.mockId}`);
    }
  }
  else{
    console.log("ERROR")
  }
    setLoading(false);
  } catch (err) {
    console.error("Error generating interview questions:", err);
  }
};

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDailog(true)}
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDailog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Tell Us More About Your Job Interviwing</DialogTitle>
            <DialogDescription>
              Add details about your job position/role, job description, and years of experience.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit}>
          {/* ✅ Moved out of DialogDescription */}
          <div className="mt-7 my-3">
            <label>Job Role/Job Position</label>
            <Input placeholder="Ex. Full Stack Developer" required
            onChange={(event)=>setJobPosition(event.target.value)}/>
          </div>
          <div className="my-3">
            <label>Job Description/Tech Stack(In Short)</label>
            <Textarea placeholder="Ex. React,Angular,Nodejs,Mysql etc" required
            onChange={(event)=>setJobDesc(event.target.value)}/>
          </div>
          <div className="my-3">
            <label>Years of experience</label>
            <Input placeholder="Ex. 5" type="number" max="50" required
            onChange={(event)=>setJobExperience(event.target.value)}/>
          </div>
          <div className="flex gap-5 justify-end mt-4">
            <Button type ="button"variant="ghost" onClick={() => setOpenDailog(false)}>Cancel</Button>
            <Button type="submit" disabled={loading}>
              {loading?
              <>
              <LoaderCircle className="animate-spin"/>'Generating from AI'
              </>:'Start Interview'

              }
              </Button>
          </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
