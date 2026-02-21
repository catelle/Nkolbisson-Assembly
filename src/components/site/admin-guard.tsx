"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { getCopy } from "@/lib/copy";

export default function AdminGuard({
  children,
  locale
}: {
  children: React.ReactNode;
  locale: string;
}) {
  const router = useRouter();
  const copy = getCopy(locale);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace(`/${locale}/admin/login`);
      return;
    }
    if (status === "authenticated" && session?.user?.role !== "admin") {
      router.replace(`/${locale}/account/login`);
    }
  }, [locale, router, session, status]);

  if (status !== "authenticated" || session?.user?.role !== "admin") {
    return (
      <div className="rounded-3xl border border-white/10 bg-sky-900/40 p-6 text-sm text-sky-100/80">
        {copy.admin.guardChecking}
      </div>
    );
  }

  return <>{children}</>;
}
