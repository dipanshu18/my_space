import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = (await cookies()).get("token")?.value;

  if (token) {
    redirect("/feed");
  }
  return <main className="max-w-xl mx-auto h-dvh">{children}</main>;
}
