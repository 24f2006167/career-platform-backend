"use client";

import { useRouter } from "next/navigation";

export default function Topbar({
  user,
}: any) {

  const router = useRouter();

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    localStorage.removeItem("isNewUser");

    router.replace("/login");

  };

  return (

    <div className="flex items-center justify-between border-b border-white/10 px-8 py-5">

      <div>

        <h2 className="text-2xl font-bold">
          Welcome {user?.name} 👋
        </h2>

        <p className="text-gray-400">
          Role: {user?.role}
        </p>

      </div>

      <button
        onClick={handleLogout}
        className="rounded-2xl bg-red-500 px-6 py-3 font-bold hover:bg-red-600"
      >
        Logout
      </button>

    </div>

  );

}