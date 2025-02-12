"use client";

import { useState } from "react";
import { markAsAccepted } from "@/lib/actions";

export function AnswerItem({ answer, accepted }: { answer: any; accepted?: boolean }) {
  const [loading, setLoading] = useState(false);

  const markAsCorrect = async () => {
    if (accepted || loading) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("questionId", answer.question_id);
    formData.append("answerId", answer.id);

    await markAsAccepted(formData);
    setLoading(false);
  };

  return (
    <div className="p-3 border rounded flex items-center justify-between">
      <p className={accepted ? "font-bold text-green-600" : ""}>{answer.text}</p>
      <button
        className={`ml-2 p-2 ${accepted ? "text-green-600" : "text-gray-500 hover:text-blue-500"}`}
        onClick={markAsCorrect}
        disabled={accepted || loading}
      >
        {accepted ? "✅ Accepted" : "✔ Accept"}
      </button>
    </div>
  );
}
