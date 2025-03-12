import { NextResponse } from "next/server";

export default async function middleware(request: Request) {
  //! Obtenir les routes sur lesquelles le user navigue
  // const { pathname } = new URL(request.url);

  // On ne peut pas utiliser Prisma ici, donc on vérifie juste les routes
  // if (pathname.startsWith("/admin") || pathname.startsWith("/mon-compte")) {
  //   return NextResponse.redirect(new URL("/not-found", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
