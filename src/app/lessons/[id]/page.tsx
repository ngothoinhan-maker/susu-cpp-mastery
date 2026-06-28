"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function LessonsRedirect() {
  const params = useParams();
  const router = useRouter();
  
  useEffect(() => {
    const weekId = params.id as string;
    if (weekId) {
      router.replace(`/week/${weekId}/lesson/1`);
    } else {
      router.replace("/");
    }
  }, [params.id, router]);

  return null;
}

