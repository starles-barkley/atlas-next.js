"use client";

import { useState } from "react";

export function AnswerItem({ answer, accepted }: { answer: any, accepted?: boolean }) {
  const [loading, setLoading] = useState(false);

  const markAsAccepted = async () => {
    if (accepted || loading) return;

    setLoading(true);

    try {
      const response = await fetch(`/api/answers/${answer.id}/accept`, {
        method: "POST",
      });

      if (response.ok) {
        window.location.reload(); // Refresh page to reflect change
      }
    } catch (error) {
      console.error("Failed to mark answer as accepted:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 border rounded flex items-center justify-between">
      <p className={accepted ? "font-bold text-green-600" : ""}>{answer.text}</p>
      <button
        className={`ml-2 p-2 ${accepted ? "text-green-600" : "text-gray-500 hover:text-blue-500"}`}
        onClick={markAsAccepted}
        disabled={accepted || loading}
      >
        {accepted ? "✅ Accepted" : "✔ Accept"}
      </button>
    </div>
  );
}
