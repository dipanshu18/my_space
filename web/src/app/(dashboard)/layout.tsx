import Link from "next/link";
import {
  // Bell,
  ChartBarIcon,
  LucideHome,
  TvMinimalPlay,
  Upload,
  User,
} from "lucide-react";

import { LogoutBtn } from "@/components/logout-btn";
import { Navbar } from "@/components/navbar";

const homeLinks: {
  icon: React.ReactNode;
  title: string;
  link: string;
}[] = [
  {
    icon: <LucideHome />,
    title: "Home",
    link: "/feed",
  },
  {
    icon: <ChartBarIcon />,
    title: "Trending",
    link: "/trending",
  },
  {
    icon: <Upload />,
    title: "Upload",
    link: "/upload",
  },
  {
    icon: <TvMinimalPlay />,
    title: "Subscriptions",
    link: "/subscriptions",
  },
  // {
  //   icon: <Bell />,
  //   title: "Notifications",
  //   link: "/notifications",
  // },
  {
    icon: <User />,
    title: "Channel",
    link: "/channel",
  },
];

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="fixed w-full top-0 z-10 lg:hidden">
        <Navbar />
      </div>

      <div className="flex flex-col justify-between lg:flex-row">
        {/* Desktop Sidebar */}
        <aside className="hidden h-dvh lg:flex flex-col justify-between sticky top-0 p-5 lg:w-72 border-r">
          <ul className="flex flex-col w-full">
            {homeLinks.map((item, idx) => (
              <Link
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                key={idx}
                href={item.link}
                className="w-full"
              >
                <li className="flex gap-2 items-center text-lg w-full font-medium hover:bg-neutral-200 rounded-md transition-all duration-300 p-5">
                  {item.icon} {item.title}
                </li>
              </Link>
            ))}
          </ul>

          <LogoutBtn />
        </aside>

        {/* Content */}
        <main className="flex-1">{children}</main>

        {/* Mobile Bottom Navbar */}
        <div className="lg:hidden fixed w-full bottom-0 z-10 py-3 bg-white border-t">
          <ul className="flex justify-evenly gap-5">
            {homeLinks.map((item, idx) => (
              <li
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                key={idx}
                className="text-lg font-medium hover:bg-neutral-200 rounded-full transition-all duration-300"
              >
                <Link href={item.link} className="flex gap-2 p-2">
                  {item.icon}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
