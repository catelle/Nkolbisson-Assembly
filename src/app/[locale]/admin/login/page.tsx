"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { Eye, EyeOff } from "lucide-react";
import { getCopy } from "@/lib/copy";
import { getLocaleFromPathname } from "@/lib/locale";
import LanguageSwitch from "@/components/site/language-switch";

export default function AdminLoginPage() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const copy = getCopy(locale);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace(`/${locale}/admin`);
    }
  }, [locale, router, status]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        identifier: username,
        password
      });

      if (result?.ok) {
        router.replace(`/${locale}/admin`);
        return;
      }

      setError(copy.admin.loginError);
    } catch {
      setError(copy.admin.loginError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-sky-950 px-4 text-sky-100">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-sky-900/70 p-8 shadow-xl">
        <div className="flex justify-end">
          <LanguageSwitch locale={locale} variant="dark" />
        </div>
        <p className="text-xs uppercase tracking-[0.3em] text-sky-400">{copy.admin.space}</p>
        <h1 className="mt-3 font-display text-3xl text-white">{copy.admin.loginTitle}</h1>
        <p className="mt-2 text-sm text-sky-300">{copy.admin.loginSubtitle}</p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">{copy.admin.username}</label>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="admin"
              autoComplete="username"
              required
              className="mt-2 w-full rounded-2xl border border-white/10 bg-sky-900 px-4 py-3 text-sm text-white"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">{copy.admin.password}</label>
            <div className="relative mt-2">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="********"
                autoComplete="current-password"
                required
                className="w-full rounded-2xl border border-white/10 bg-sky-900 px-4 py-3 pr-12 text-sm text-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-sky-300"
                aria-label={showPassword ? copy.admin.hidePassword : copy.admin.showPassword}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
          {error ? <p className="text-xs text-yellow-300">{error}</p> : null}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-yellow-500 px-4 py-3 text-sm font-semibold text-sky-950"
          >
            {loading ? "..." : copy.admin.loginButton}
          </button>
        </form>
      </div>
    </div>
  );
}
