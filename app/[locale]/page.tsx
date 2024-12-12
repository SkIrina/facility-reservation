import HomeForm from "../components/home/home-form";
import { getDictionary } from "./dictionaries";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale;

  return <HomeForm locale={locale} />;
}
