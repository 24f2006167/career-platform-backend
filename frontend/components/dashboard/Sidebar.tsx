"use client";

export default function Sidebar({
  user,
}: any) {

  return (

    <aside className="w-[260px] min-h-screen border-r border-white/10 bg-black/40 p-6">

      <h1 className="text-3xl font-black text-white">
        Nexvora AI
      </h1>

      <p className="mt-2 text-sm text-gray-400">
        {user?.role?.toUpperCase()} PANEL
      </p>

      <div className="mt-10 space-y-4">

        <div className="rounded-2xl bg-white/5 p-4">
          Dashboard
        </div>

        <div className="rounded-2xl bg-white/5 p-4">
          Features
        </div>

        <div className="rounded-2xl bg-white/5 p-4">
          Settings
        </div>

      </div>

    </aside>

  );

}