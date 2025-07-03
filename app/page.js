'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard'); // 👈 Redirect to /dashboard
  }, []);

  return (
    <div className="p-4">
      <p className="text-gray-500">Redirecting to dashboard...</p>
      <Button onClick={() => router.replace('/dashboard')}>Click if not redirected</Button>
    </div>
  );
}
