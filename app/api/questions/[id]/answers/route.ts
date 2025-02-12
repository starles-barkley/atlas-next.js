import { NextResponse } from "next/server";
import { fetchAnswers } from "@/lib/data";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const questionId = params.id;
    const answers = await fetchAnswers(questionId);

    return NextResponse.json(answers);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch answers" },
      { status: 500 }
    );
  }
}
