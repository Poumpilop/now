import { validateRequest } from "@/auth";
import { redirect, usePathname } from "next/navigation";
import SessionProvider from "./SessionProvider";
import Navbar from "./Navbar";
import MenuBar from "./MenuBar";
import HeaderUser from "./HeaderUser";
import HeaderSwitcher from "@/components/HeaderSwitcher";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateRequest();

  if (!session.user) redirect("/login");

  return <SessionProvider 
    value={session}
    >
       <div className="flex flex-col min-h-screen bg-background text-foreground">
       <HeaderSwitcher />  {/* Header dynamique */}
          {children}
      </div>
    </SessionProvider>;
}