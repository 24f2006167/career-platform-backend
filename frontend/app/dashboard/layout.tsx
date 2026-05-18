
// "use client";

// import { useEffect, useState } from "react";

// import Sidebar from "@/components/dashboard/Sidebar";
// import Topbar from "@/components/dashboard/Topbar";

// import API from "@/lib/api";

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {

//   const [user, setUser] =
//     useState<any>(null);

//   const [loading, setLoading] =
//     useState(true);

//   // VALIDATE SESSION
//   useEffect(() => {

//     const fetchUser = async () => {

//       try {

//         // GET CURRENT USER
//         const response =
//           await API.get("/me");

//         const data =
//           response.data;

//         console.log(
//           "CURRENT USER:",
//           data
//         );

//         // SAVE USER
//         setUser(data);

//         localStorage.setItem(
//           "user",
//           JSON.stringify(data)
//         );

//       } catch (error) {

//         console.log(
//           "Dashboard Auth Error:",
//           error
//         );

//         // CLEAR STORAGE
//         localStorage.clear();

//         // REDIRECT
//         window.location.href =
//           "/login";

//       } finally {

//         setLoading(false);

//       }

//     };

//     fetchUser();

//   }, []);

//   // LOADING
//   if (loading) {

//     return (

//       <div className="min-h-screen bg-black flex items-center justify-center text-white text-2xl">

//         Loading Dashboard...

//       </div>

//     );

//   }

//   return (

//     <div className="min-h-screen bg-black text-white flex">

//       {/* SIDEBAR */}
//       <Sidebar user={user} />

//       {/* MAIN */}
//       <div className="flex-1 flex flex-col">

//         {/* TOPBAR */}
//         <Topbar user={user} />

//         {/* CONTENT */}
//         <main className="p-8">

//           {children}

//         </main>

//       </div>

//     </div>

//   );

// }



"use client";

import { useEffect, useState } from "react";

import { usePathname } from "next/navigation";

import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

import API from "@/lib/api";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathname =
    usePathname();

  const [user, setUser] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  // VALIDATE SESSION
  useEffect(() => {

    const fetchUser = async () => {

      try {

        // GET CURRENT USER
        const response =
          await API.get("/me");

        const data =
          response.data;

        console.log(
          "CURRENT USER:",
          data
        );

        // SAVE USER
        setUser(data);

        localStorage.setItem(
          "user",
          JSON.stringify(data)
        );

        // ROLE-BASED ROUTE PROTECTION

        // ADMIN
        if (
          pathname.startsWith(
            "/dashboard/admin"
          ) &&
          data.role !== "admin"
        ) {

          window.location.href =
            `/dashboard/${data.role}`;

          return;

        }

        // RECRUITER
        if (
          pathname.startsWith(
            "/dashboard/recruiter"
          ) &&
          data.role !== "recruiter"
        ) {

          window.location.href =
            `/dashboard/${data.role}`;

          return;

        }

        // CANDIDATE
        if (
          pathname.startsWith(
            "/dashboard/candidate"
          ) &&
          data.role !== "candidate"
        ) {

          window.location.href =
            `/dashboard/${data.role}`;

          return;

        }

      } catch (error) {

        console.log(
          "Dashboard Auth Error:",
          error
        );

        // CLEAR STORAGE
        localStorage.clear();

        // REDIRECT
        window.location.href =
          "/login";

      } finally {

        setLoading(false);

      }

    };

    fetchUser();

  }, [pathname]);

  // LOADING
  if (loading) {

    return (

      <div className="min-h-screen bg-black flex items-center justify-center text-white text-2xl">

        Loading Dashboard...

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-black text-white flex">

      {/* SIDEBAR */}
      <Sidebar user={user} />

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        {/* TOPBAR */}
        <Topbar user={user} />

        {/* CONTENT */}
        <main className="p-8">

          {children}

        </main>

      </div>

    </div>

  );

}