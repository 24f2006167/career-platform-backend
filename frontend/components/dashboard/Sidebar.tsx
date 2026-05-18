

// "use client";

// import { useEffect, useState } from "react";

// export default function Sidebar({
//   user,
// }: any) {

//   const [mounted, setMounted] =
//     useState(false);

//   useEffect(() => {

//     setMounted(true);

//   }, []);

//   // PREVENT HYDRATION MISMATCH
//   if (!mounted) {

//     return null;

//   }

//   const role =
//     user?.role
//       ? user.role.toUpperCase()
//       : "USER";

//   return (

//     <aside className="w-[260px] min-h-screen border-r border-white/10 bg-black/40 p-6">

//       {/* LOGO */}
//       <h1 className="text-3xl font-black text-white">

//         Nexvora AI

//       </h1>

//       {/* ROLE */}
//       <p className="mt-2 text-sm text-gray-400">

//         {role} PANEL

//       </p>

//       {/* MENU */}
//       <div className="mt-10 space-y-4">

//         <div className="rounded-2xl bg-white/5 p-4">

//           Dashboard

//         </div>

//         <div className="rounded-2xl bg-white/5 p-4">

//           Features

//         </div>

//         <div className="rounded-2xl bg-white/5 p-4">

//           Settings

//         </div>

//       </div>

//     </aside>

//   );

// }

"use client";

export default function Sidebar({
  user,
}: any) {

  const role =
    user?.role
      ? user.role.toUpperCase()
      : "USER";

  return (

    <aside className="w-[260px] min-h-screen border-r border-white/10 bg-black/40 p-6">

      {/* LOGO */}
      <h1 className="text-3xl font-black text-white">

        Nexvora AI

      </h1>

      {/* ROLE */}
      <p className="mt-2 text-sm text-gray-400">

        {role} PANEL

      </p>

      {/* MENU */}
      <div className="mt-10 space-y-4">

        <div className="rounded-2xl bg-white/5 p-4 cursor-pointer hover:bg-white/10 transition">

          Dashboard

        </div>

        <div className="rounded-2xl bg-white/5 p-4 cursor-pointer hover:bg-white/10 transition">

          Features

        </div>

        <div className="rounded-2xl bg-white/5 p-4 cursor-pointer hover:bg-white/10 transition">

          Settings

        </div>

      </div>

    </aside>

  );

}