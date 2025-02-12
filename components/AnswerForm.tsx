"use client";

import { useState } from "react";
import { addAnswer } from "@/lib/actions";

export function AnswerForm({ questionId }: { questionId: string }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("questionId", questionId);
    formData.append("text", text);

    await addAnswer(formData);
    setText("");
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <textarea
        className="w-full border rounded p-2"
        placeholder="Write your answer..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={loading}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Answer"}
      </button>
    </form>
  );
}
