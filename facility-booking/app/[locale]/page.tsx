import { HomeForm } from "@/components/home/home-form";
import { LanguageSwitcher } from "@/components/language-switcher";
import { getDictionary } from "./dictionaries";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale;
  console.log(locale);
  const dictionary = await getDictionary(locale as "en" | "ja");

  return (
    <div className="min-h-screen bg-gray-50">
      <LanguageSwitcher locale={locale} />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          {dictionary.home.title}
        </h1>

        <HomeForm dictionary={dictionary.home} locale={locale} />
      </div>
    </div>
  );
}
