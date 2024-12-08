import { LanguageSwitcher } from "@/components/language-switcher";
import { getDictionary } from "./dictionaries";

export default async function PageLayout({
  params,
  children,
}: {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}) {
  const locale = (await params).locale;
  console.log(locale);
  const dictionary = await getDictionary(locale as "en" | "ja");

  return (
    <div className="min-h-screen bg-gray-50">
      <LanguageSwitcher locale={locale} />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center my-8">
          {dictionary.home.title}
        </h1>

        {children}
      </div>
    </div>
  );
}
