import { MessageSquare } from "lucide-react";
import QuestionForm from "@/components/site/question-form";
import { getCopy } from "@/lib/copy";

export default async function AskPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const copy = getCopy(locale);

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
    </div>
  );
}
