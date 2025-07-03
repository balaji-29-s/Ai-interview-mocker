import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function InterviewItemCard({ interview }) {
    const router=useRouter();
    const onStart=()=>{
        router.push('/dashboard/interview/'+interview?.mockId)
    }
    const onFeedbackPress=()=>{
        router.push('/dashboard/interview/'+interview.mockId+'/feedback')
    }
  return (
    <div className="border shadow-sm rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
      <h2 className="text-lg font-semibold text-indigo-600 mb-1">
        {interview?.jobPosition || "Untitled Position"}
      </h2>
      <h2 className="text-sm text-gray-500">
         Years of Experience : {interview?.jobExperience}
      </h2>
      <p className="text-xs text-gray-500 mb-1">
        <strong>Date:</strong> {interview?.createdAt || "Unknown"}
      </p>
      <p className="text-sm text-gray-500">
        <strong>Mock ID:</strong> {interview?.mockId || "N/A"}
      </p>
      <div className="flex justify-between mt-2 gap-5">
        <Button size="sm" variant="outline"
        onClick={onFeedbackPress}>Feedback</Button>
        <Button size="sm"
        onClick={onStart}
        >Start</Button>

      </div>
    </div>
  );
}

export default InterviewItemCard;
