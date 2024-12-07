import Link from 'next/link'

export function LanguageSwitcher({ locale }: { locale: string }) {
  return (
    <div className="absolute top-4 right-4 space-x-2">
      <Link
        href="/en"
        className={`px-3 py-1 rounded inline-block ${
          locale === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200'
        }`}
      >
        EN
      </Link>
      <Link
        href="/ja"
        className={`px-3 py-1 rounded inline-block ${
          locale === 'ja' ? 'bg-blue-500 text-white' : 'bg-gray-200'
        }`}
      >
        JP
      </Link>
    </div>
  )
}