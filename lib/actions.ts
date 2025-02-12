"use server";

import { revalidatePath } from "next/cache";
import { insertTopic } from "./data";
import { redirect } from "next/navigation";
import { insertQuestion, incrementVotes } from "./data"; 
import { signOut } from "next-auth/react";
import { insertAnswer, markAnswerAsAccepted } from "./data";


export async function addTopic(data: FormData) {
  let topic;
  try {
    topic = await insertTopic({
      title: data.get("title") as string,
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add topic.");
  } finally {
    revalidatePath("/ui/topics/[id]", "page");
    topic && redirect(`/ui/topics/${topic.id}`);
  }
}

export async function addQuestion(question: FormData) {
  try {
    insertQuestion({
      title: question.get("title") as string,
      topic_id: question.get("topic_id") as string,
      votes: 0,
    });
    revalidatePath("/ui/topics/[id]", "page");
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add question.");
  }
}

export async function addVote(data: FormData) {
  try {
    incrementVotes(data.get("id") as string);
    revalidatePath("/ui/topics/[id]", "page");
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add vote.");
  }
}


export async function handleSignOut() {
  await signOut();
}

export async function addAnswer(data: FormData) {
  try {
    const questionId = data.get("questionId") as string;
    const text = data.get("text") as string;

    await insertAnswer(questionId, text);
    revalidatePath(`/ui/questions/${questionId}`, "page");
  } catch (error) {
    console.error("Error adding answer:", error);
    throw new Error("Failed to add answer.");
  }
}

export async function markAsAccepted(data: FormData) {
  try {
    const questionId = data.get("questionId") as string;
    const answerId = data.get("answerId") as string;

    await markAnswerAsAccepted(questionId, answerId);
    revalidatePath(`/ui/questions/${questionId}`, "page");
  } catch (error) {
    console.error("Error marking answer as accepted:", error);
    throw new Error("Failed to mark answer as accepted.");
  }
}