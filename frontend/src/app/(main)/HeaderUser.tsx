import ThemeButton from "@/components/ThemeButton";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sun } from "lucide-react";

export default function Navbar() {
    return <div className="flex-none">
    <header className="sticky top-0 z-10 bg-background border-b border-border p-4">
    <div className="max-w-3xl mx-auto flex justify-between items-center">
      <Button variant="ghost" size="icon">
        <ArrowLeft className="h-5 w-5" />
      </Button>
      <h1 className="text-2xl font-bold">Profil</h1>
      <ThemeButton />
    </div>
  </header>
  </div>
}