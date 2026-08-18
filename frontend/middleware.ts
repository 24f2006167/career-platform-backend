// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(
//   request: NextRequest
// ) {

//   // GET TOKEN
//   const accessToken =
//     request.cookies.get(
//       "access_token"
//     );

//   const pathname =
//     request.nextUrl.pathname;

//   // PROTECTED ROUTES
//   const protectedRoutes = [
//     "/dashboard",
//   ];

//   // CHECK PROTECTED ROUTE
//   const isProtectedRoute =
//     protectedRoutes.some(
//       (route) =>
//         pathname.startsWith(route)
//     );

//   // NOT LOGGED IN
//   if (
//     isProtectedRoute &&
//     !accessToken
//   ) {

//     return NextResponse.redirect(
//       new URL(
//         "/login",
//         request.url
//       )
//     );

//   }

//   // ALREADY LOGGED IN
//   if (
//     accessToken &&
//     (
//       pathname === "/login" ||
//       pathname === "/signup"
//     )
//   ) {

//     return NextResponse.redirect(
//       new URL(
//         "/dashboard/candidate",
//         request.url
//       )
//     );

//   }

//   return NextResponse.next();

// }

// // ROUTE MATCHER
// export const config = {

//   matcher: [
//     "/dashboard/:path*",
//     "/login",
//     "/signup",
//   ],

// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(_request: NextRequest) {
  if (_request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/signup",
  ],
};