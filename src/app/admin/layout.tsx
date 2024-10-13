import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();

  if (!user?.isAdmin) redirect("/");

  return <>{children}</>;
}