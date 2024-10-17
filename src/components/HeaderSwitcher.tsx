"use client";

import HeaderUser from "@/app/(main)/HeaderUser";
import Navbar from "@/app/(main)/Navbar";
import { usePathname } from "next/navigation";

export default function HeaderSwitcher() {
  const pathname = usePathname();
  
  // Choix du header en fonction de la route
  return pathname.startsWith("/users") ? <HeaderUser /> : <Navbar />;
}