import { fetchQuestion, fetchAnswers } from "@/lib/data";
import { AnswerForm } from "@/components/AnswerForm";
import { AnswerItem } from "@/components/AnswerItem";

export default async function QuestionPage({ params }: { params: { id: string } }) {
  const question = await fetchQuestion(params.id);
  const answers = await fetchAnswers(params.id);

  if (!question) {
    return <p>No question found.</p>;
  }

  // Separate the accepted answer and sort others below it
  const acceptedAnswer = answers.find((answer) => answer.is_accepted);
  const otherAnswers = answers.filter((answer) => !answer.is_accepted);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{question.text}</h1>

      {/* Answer Submission Form */}
      <AnswerForm questionId={question.id} />

      {/* Answers List */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Answers</h2>
        <ul className="mt-2">
          {acceptedAnswer && (
            <AnswerItem key={acceptedAnswer.id} answer={acceptedAnswer} accepted />
          )}
          {otherAnswers.map((answer) => (
            <AnswerItem key={answer.id} answer={answer} />
          ))}
        </ul>
      </div>
    </div>
  );
}
