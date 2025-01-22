import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { LogoutBtn } from "./logout-btn";

export function Logo() {
  return (
    <div className="flex items-center gap-1">
      <Image
        src={"/logo.svg"}
        alt="MySpace Logo"
        width={100}
        height={100}
        quality={100}
        className="w-5 h-5"
      />

      <h1 className="text-xl font-bold">MySpace</h1>
    </div>
  );
}

const landingLinks: { title: string; link: string }[] = [
  {
    title: "Features",
    link: "#features",
  },
  {
    title: "How it works",
    link: "#working",
  },
  {
    title: "FAQ's",
    link: "#faqs",
  },
];

export async function Navbar() {
  const session = (await cookies()).get("session")?.value;

  return (
    <nav className="sticky top-0 z-10 bg-white shadow py-3 w-full">
      <div className="max-w-5xl mx-auto px-8 flex items-center justify-between">
        <Logo />

        {!session && (
          <ul className="flex items-center gap-10">
            {landingLinks.map((item, idx) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <li key={idx}>
                <Link href={item.link}>{item.title}</Link>
              </li>
            ))}
          </ul>
        )}

        <div>
          {!session ? (
            <Link href={"/register"}>
              <Button>Register</Button>
            </Link>
          ) : (
            <LogoutBtn />
          )}
        </div>
      </div>
    </nav>
  );
}
