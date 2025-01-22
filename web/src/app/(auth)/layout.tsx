export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="max-w-xl mx-auto h-dvh">{children}</main>;
}
