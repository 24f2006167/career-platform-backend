import Link from "next/link";

interface AdminAction {
  title: string;
  description: string;
  icon: string;
  href?: string;
}

interface AdminModuleShellProps {
  badge: string;
  title: string;
  description: string;
  actions: AdminAction[];
}

export default function AdminModuleShell({
  badge,
  title,
  description,
  actions,
}: AdminModuleShellProps) {
  return (
    <div className="space-y-7">
      <section className="relative overflow-hidden rounded-[2rem] border border-purple-500/20 bg-gradient-to-br from-white/10 via-purple-500/10 to-black p-8 shadow-[0_0_50px_rgba(168,85,247,0.12)]">
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />

        <div className="relative">
          <p className="text-sm font-semibold text-purple-300">
            {badge}
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight">
            {title}
          </h1>

          <p className="mt-4 max-w-3xl text-gray-400">
            {description}
          </p>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        {actions.map((action) => {
          const Card = (
            <div className="group h-full rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 transition hover:border-purple-400/40 hover:bg-purple-500/10">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-2xl">
                  {action.icon}
                </div>

                <div>
                  <h2 className="text-xl font-black">
                    {action.title}
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-gray-400">
                    {action.description}
                  </p>

                  {action.href && (
                    <p className="mt-4 text-sm font-semibold text-purple-300">
                      Open →
                    </p>
                  )}
                </div>
              </div>
            </div>
          );

          if (action.href) {
            return (
              <Link key={action.title} href={action.href}>
                {Card}
              </Link>
            );
          }

          return <div key={action.title}>{Card}</div>;
        })}
      </section>
    </div>
  );
}