import { type NextFetchEvent, type NextRequest, NextResponse } from "next/server";
import { type NextMiddlewareWithAuth, withAuth } from "next-auth/middleware";
// export { default } from "next-auth/middleware"

// export const config = { matcher: ["/dashboard"] }

const middleware = (request: NextRequest, fetch: NextFetchEvent) => {
  const requestHeaders = new Headers(request.headers);
  const pathname = new URL(request.url).pathname;
  requestHeaders.set('x-pathname', pathname);
  if (pathname.startsWith("/dashboard")) {
    // call withAuth middleware
    const mw: NextMiddlewareWithAuth = () => {
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        }
      });
    }
    const resp = withAuth(mw)(request as never, fetch);
    return resp;
  }
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    }
  });
}

export default middleware;