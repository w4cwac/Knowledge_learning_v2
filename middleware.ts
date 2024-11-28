import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { apiAuthPrefix, authRoutes, DEFAULT_REDIRECT, langRoutes, publicRoutes, webhooksRoutes } from "./routes";
import { NextResponse } from 'next/server';
import { createI18nMiddleware } from 'next-international/middleware';


const { auth } = NextAuth(authConfig);



const I18nMiddleware = createI18nMiddleware({
  locales: ['en', 'fr', 'es'],
  defaultLocale: 'en',
  urlMappingStrategy: 'rewrite',  
});




export default auth(async function middleware(request) {

  const { nextUrl } = request;
  const isLoggedIn = !!request.auth;

  const isLangRoute = langRoutes.includes(nextUrl.pathname);
  const isWebhooksRoute = webhooksRoutes.includes(nextUrl.pathname);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isApiAuthPrefix = nextUrl.pathname.startsWith(apiAuthPrefix);

  // Handle API auth prefix routes and webhooks
  if (isApiAuthPrefix || isWebhooksRoute) {
    return;
  }
  
  // Handle authentication routes
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
    }
    return I18nMiddleware(request);
  }
  
  // Handle non-public routes
  if (!isLoggedIn && !isPublicRoute && !isAuthRoute && !isLangRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    
    return NextResponse.redirect(new URL(`/sign-in?callbackUrl=${encodedCallbackUrl}`, nextUrl));
  }


  return I18nMiddleware(request);

});

export const config = {
  matcher: [
    '/((?!.*\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)',
  ],
};
