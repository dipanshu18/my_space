import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Navbar } from "@/components/navbar";

export default function Landing() {
  return (
    <>
      <Navbar />

      <main>
        <section className="relative">
          <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
          <div className="z-40 h-dvh max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 place-content-center place-items-center gap-5 p-8">
            <div>
              <h1 className="text-5xl font-extrabold leading-tight">
                Share, Earn and <span className="text-sky-500">Join</span> the
                distractionless space of creators
              </h1>
              <div className="my-5">
                <Link href={"/register"}>
                  <Button className="py-4 px-24 h-full bg-sky-500 hover:bg-sky-600 font-medium text-xl">
                    Get started today
                  </Button>
                </Link>
              </div>
            </div>

            <div className="w-full h-full">
              <Image
                src={"/header.svg"}
                alt="A man giving keynote"
                width={1080}
                height={1920}
                quality={100}
                className="w-full h-full"
              />
            </div>
          </div>
        </section>

        <section
          id="features"
          className="h-dvh flex flex-col justify-center items-center max-w-5xl mx-auto my-20 p-8"
        >
          <h1 className="my-10 text-center text-4xl font-bold">
            Features we provide
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array(5)
              .fill("")
              .map((_, idx) => (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  key={idx}
                  className="space-y-2 p-5 rounded-md shadow hover:shadow-md transition-all duration-300"
                >
                  <h1 className="text-xl font-bold">Title</h1>
                  <p className="text-sm">
                    Body: Lorem ipsum dolor sit amet consectetur, adipisicing
                    elit. Accusamus nemo ex nobis ab nihil vitae harum ullam
                    amet molestiae magnam.
                  </p>
                </div>
              ))}
          </div>
        </section>

        <section id="working" className="relative w-full text-white">
          <div className="absolute top-0 z-[-2] h-full w-full bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#000000_1px)] bg-[size:20px_20px]" />

          <div className="max-w-5xl mx-auto p-8">
            <h1 className="my-10 text-center text-4xl font-bold">
              How it works
            </h1>

            <div className="grid grid-cols-1 place-content-center gap-10 mb-10">
              {Array(5)
                .fill("")
                .map((_, idx) => (
                  <div
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    key={idx}
                    className="bg-neutral-200 text-black w-full space-y-2 p-5 rounded-md shadow hover:shadow-md transition-all duration-300"
                  >
                    <h1 className="text-xl font-bold">Title</h1>
                    <p className="text-sm">
                      Body: Lorem ipsum dolor sit amet consectetur, adipisicing
                      elit. Accusamus nemo ex nobis ab nihil vitae harum ullam
                      amet molestiae magnam.
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </section>

        <section
          id="faqs"
          className="h-dvh flex flex-col justify-center items-center max-w-5xl mx-auto p-8"
        >
          <h1 className="text-center text-4xl font-bold">FAQ{`'`}s</h1>

          <div className="grid grid-cols-1 w-full gap-2">
            {Array(5)
              .fill("")
              .map((_, idx) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <Accordion key={idx} type="single" collapsible>
                  <AccordionItem value={`${idx}`}>
                    <AccordionTrigger className="text-lg font-bold">
                      Is it accessible?
                    </AccordionTrigger>
                    <AccordionContent>
                      Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
          </div>
        </section>

        <section className="relative h-dvh bg-black flex justify-center items-center">
          <div>
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
            {/* <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]" /> */}
          </div>

          <div className="z-40 max-w-5xl mx-auto p-8 space-y-10 text-white">
            <h1 className="text-5xl font-extrabold text-center">
              What are you waiting for?
            </h1>
            <p className="text-center">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore
              provident dolores repellendus est, aspernatur temporibus in
              doloremque! Ut quia praesentium repellat odit dolores
              exercitationem voluptas optio esse sunt blanditiis provident iusto
              sit eaque error minus a molestiae dignissimos voluptatum ex hic
              nulla, cum tempora non quo. Ullam eum maxime esse?
            </p>

            <div className="max-w-xl mx-auto">
              <Link href={"/register"}>
                <Button className="w-full h-full py-4 bg-sky-500 text-xl hover:bg-sky-600">
                  Get started today
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
