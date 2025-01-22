import type { Route } from "./+types/home";
import Footer from "~/components/home/footer";
import Header from "~/components/home/header";
import Hero from "~/components/home/hero";


export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Knox" },
    { name: "description", content: "The Cornerstone of Your Account Security" },
  ];
}

export default function Home() {
  return (
    <div className="bg-gray-800 grid min-h-screen grid-rows-[auto_1fr_auto]">
      <Header />
      <main className="overflow-y-auto">
        <Hero />
      </main>
      <Footer />
    </div>
  )
}
