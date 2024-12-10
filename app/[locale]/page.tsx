import HomeForm from "../components/home/home-form";
import { getDictionary } from "./dictionaries";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale;
  console.log(locale);
  const dictionary = await getDictionary(locale as "en" | "ja");

  return <HomeForm locale={locale} dictionary={dictionary} />;
}
