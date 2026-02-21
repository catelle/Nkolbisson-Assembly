"use client";

import { signOut } from "next-auth/react";
import { getCopy } from "@/lib/copy";

export default function AdminLogout({ locale }: { locale: string }) {
  const copy = getCopy(locale);

  const handleLogout = () => {
    signOut({ callbackUrl: `/${locale}/admin/login` });
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white"
    >
      {copy.admin.logout}
    </button>
  );
}
