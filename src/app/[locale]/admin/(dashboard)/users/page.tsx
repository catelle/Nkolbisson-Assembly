import { getCopy } from "@/lib/copy";

const users = [
  { id: "u1", name: "Pasteur Emmanuel", email: "emmanuel@cmfi-nkolbisson.org", role: "Admin" },
  { id: "u2", name: "Soeur Nadine", email: "nadine@cmfi-nkolbisson.org", role: "Editor" }
];

export default async function AdminUsersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const copy = getCopy(locale);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-sky-900/70 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-sky-400">{copy.admin.users.label}</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">{copy.admin.users.title}</h2>
          </div>
          <button className="rounded-full bg-yellow-500 px-4 py-2 text-xs font-semibold text-sky-950">
            {copy.admin.users.add}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="rounded-3xl border border-white/10 bg-sky-900/60 p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-lg font-semibold text-white">{user.name}</p>
                <p className="text-sm text-sky-300">{user.email}</p>
              </div>
              <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-white">{user.role}</span>
              <div className="flex gap-2">
                <button className="rounded-full border border-white/20 px-3 py-1 text-xs text-white">
                  {copy.admin.users.edit}
                </button>
                <button className="rounded-full border border-white/20 px-3 py-1 text-xs text-white">
                  {copy.admin.users.remove}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
