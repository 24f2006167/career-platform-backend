

// "use client";

// import { useRouter } from "next/navigation";

// export default function Topbar({
//   user,
// }: any) {

//   const router = useRouter();

//   // LOGOUT
//   const handleLogout = async () => {

//     try {

//       // BACKEND LOGOUT
//       await fetch(
//         "http://127.0.0.1:8000/logout",
//         {
//           method: "POST",

//           credentials: "include",
//         }
//       );

//     } catch (error) {

//       console.log(
//         "Logout Error:",
//         error
//       );

//     }

//     // CLEAR STORAGE
//     localStorage.removeItem("user");

//     localStorage.removeItem("isNewUser");

//     // REDIRECT
//     window.location.href =
//       "/login";

//   };

//   return (

//     <div className="flex items-center justify-between border-b border-white/10 px-8 py-5">

//       {/* USER INFO */}
//       <div>

//         <h2 className="text-2xl font-bold">

//           Welcome {user?.name} 👋

//         </h2>

//         <p className="text-gray-400">

//           Role: {user?.role}

//         </p>

//       </div>

//       {/* LOGOUT BUTTON */}
//       <button
//         onClick={handleLogout}
//         className="rounded-2xl bg-red-500 px-6 py-3 font-bold hover:bg-red-600 transition"
//       >

//         Logout

//       </button>

//     </div>

//   );

// }

"use client";

import API from "@/lib/api";

export default function Topbar({
  user,
}: any) {

  // LOGOUT
  const handleLogout = async () => {

    try {

      // BACKEND LOGOUT
      await API.post(
        "/logout"
      );

    } catch (error) {

      console.log(
        "Logout Error:",
        error
      );

    }

    // CLEAR STORAGE
    localStorage.clear();

    // REDIRECT
    window.location.href =
      "/login";

  };

  return (

    <div className="flex items-center justify-between border-b border-white/10 px-8 py-5">

      {/* USER INFO */}
      <div>

        <h2 className="text-2xl font-bold">

          Welcome {user?.name} 👋

        </h2>

        <p className="text-gray-400">

          Role: {user?.role}

        </p>

      </div>

      {/* LOGOUT BUTTON */}
      <button
        onClick={handleLogout}
        className="rounded-2xl bg-red-500 px-6 py-3 font-bold hover:bg-red-600 transition"
      >

        Logout

      </button>

    </div>

  );

}