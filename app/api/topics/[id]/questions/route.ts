import { NextResponse } from "next/server";
import { fetchQuestions } from "@/lib/data";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const topicId = params.id;
    const questions = await fetchQuestions(topicId);

    return NextResponse.json(questions);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch questions" },
      { status: 500 }
    );
  }
}
