import { Fragment } from "react/jsx-runtime";
import type { Route } from "./+types/home";
import Footer from "~/components/home/footer";
import Header from "~/components/home/header";
import Hero from "~/components/home/hero";
import { Outlet } from "react-router";


export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Knox" },
    { name: "description", content: "The Cornerstone of Your Account Security" },
  ];
}

export default function Home() {
  return (
    <Fragment>
      <div className="bg-gray-800 grid min-h-screen grid-rows-[auto_1fr_auto]">
        <Header />
        <main className="max-w-screen-lg mx-auto my-4">
          <Hero />
          <Outlet />
        </main>
        <Footer />
      </div>
    </Fragment>
  )
}
