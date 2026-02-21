import { HelpCircle, MessageSquare } from "lucide-react";
import { getCopy } from "@/lib/copy";
import { getPublicAnswers, getPublicQuestions } from "@/lib/content";
import QuestionForm from "@/components/site/question-form";

export default async function QuestionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const copy = getCopy(locale);
  const publicAnswers = await getPublicAnswers();
  const questions = await getPublicQuestions();

  return (
    <div className="mx-auto w-full max-w-4xl space-y-10 px-4 pb-24 pt-12 md:px-6">
      <div className="rounded-[32px] bg-sky-950 px-8 py-10 text-white">
        <div className="flex items-center gap-3 text-yellow-200">
          <MessageSquare className="h-6 w-6" />
          <span className="text-xs font-semibold uppercase tracking-[0.3em]">{copy.askPage.label}</span>
        </div>
        <h1 className="mt-4 font-display text-4xl">{copy.askPage.title}</h1>
        <p className="mt-3 text-sm text-sky-100/80">{copy.askPage.description}</p>
      </div>

      <QuestionForm
        labels={{
          formLabel: copy.askPage.formLabel,
          formPlaceholder: copy.askPage.formPlaceholder,
          formNote: copy.askPage.formNote,
          submit: copy.askPage.submit,
          success: copy.askPage.success,
          loginHint: copy.askPage.loginHint,
          chatLink: copy.askPage.chatLink,
          loginHref: `/${locale}/account/login`,
          chatHref: `/${locale}/account/chat`,
          loginLabel: copy.common.loginLabel,
          chatLabel: copy.common.chatLabel
        }}
      />

      <div className="rounded-[32px] bg-white/90 p-8 shadow-sm">
        <div className="flex items-center gap-3 text-yellow-700">
          <HelpCircle className="h-6 w-6" />
          <span className="text-xs font-semibold uppercase tracking-[0.3em]">{copy.questionsPage.label}</span>
        </div>
        <h2 className="mt-4 font-display text-3xl text-sky-950">{copy.questionsPage.title}</h2>
        <p className="mt-3 text-sm text-sky-900/70">{copy.questionsPage.description}</p>
      </div>

      <div className="space-y-6">
        {publicAnswers.map((answer) => {
          const question = questions.find((item) => item.id === answer.questionId);
          return (
            <div key={answer.id} className="rounded-3xl border border-sky-900/10 bg-white/90 p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-900/60">{copy.common.question}</p>
              <p className="mt-2 text-lg font-semibold text-sky-950">{question?.questionText}</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-sky-900/60">{copy.common.answer}</p>
              <p className="mt-2 text-sm text-sky-900/80">{answer.answerText}</p>
              <p className="mt-4 text-xs text-sky-900/50">{answer.answeredBy}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
