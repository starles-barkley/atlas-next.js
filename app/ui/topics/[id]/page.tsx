import { AskQuestion } from "@/components/AskQuestion";
import { Question } from "@/components/Question";
import { fetchQuestions, fetchTopic } from "@/lib/data";
import { HashtagIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string } }) {
  const topic = await fetchTopic(params.id);
  const questions = await fetchQuestions(params.id);

  if (!topic) {
    return <div>Topic not found</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-black flex items-center">
        <HashtagIcon className="h-6 w-6 mr-2" /> {topic.title}
      </h1>
      <AskQuestion topic={topic.id} />
      <div className="space-y-2">
        {questions.map((question) => (
          <Link key={question.id} href={`/ui/questions/${question.id}`}>
            <div className="border p-3 rounded hover:bg-gray-100 cursor-pointer">
              <Question id={question.id} text={question.title} votes={question.votes} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
