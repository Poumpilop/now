import { validateRequest } from "@/auth";
import { ReportNotifications } from "@/components/ReportNotifications";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import io from 'socket.io-client';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();

  if (!user?.isAdmin) redirect("/");

  return <>
  {children}
  <ReportNotifications />
  </>;
}