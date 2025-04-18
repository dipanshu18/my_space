import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = (await cookies()).get("token");

  if (token) {
    return redirect("/feed");
  }
  return <main className="max-w-xl mx-auto h-dvh">{children}</main>;
}
