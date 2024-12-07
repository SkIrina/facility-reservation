import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { Locale } from './lib/i18n'

const locales: Locale[] = ['en', 'ja']
const defaultLocale: Locale = 'en'

function getLocale(request: NextRequest): string {
    console.log(request)
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()
  const locales: string[] = ['en', 'ja']
  
  try {
    return matchLocale(languages, locales, defaultLocale)
  } catch (error) {
    console.log(error)
    return defaultLocale
  }
}

export function middleware(request: NextRequest) {
    console.log(request)
  const pathname = request.nextUrl.pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.url)
    )
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|favicon.ico).*)',
  ],
}