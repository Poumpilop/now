import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Home, MapPin, Menu, MessageCircle, Search, Settings, User } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import UserButton from "@/components/UserButton";
import ThemeButton from "@/components/ThemeButton";
import { redirect } from "next/navigation";

export default function Navbar() {
    return <header className="sticky top-0 z-10 bg-background border-b border-border p-4">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64">
        <SheetTitle />
          <nav className="flex flex-col space-y-4">
            <Button variant="ghost" className="justify-start">
              <Home className="mr-2 h-4 w-4" />
              Accueil
            </Button>
            <Button variant="ghost" className="justify-start">
              <MapPin className="mr-2 h-4 w-4" />
              Découvrir
            </Button>
            <Button variant="ghost" className="justify-start">
              <MessageCircle className="mr-2 h-4 w-4" />
              Messages
            </Button>
            <Button variant="ghost" className="justify-start">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </Button>
          </nav>
        </SheetContent>
      </Sheet>
      <h1 className="text-2xl font-bold text-primary">Now!</h1>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <Search className="h-5 w-5" />
        </Button>
        <ThemeButton />
        <UserButton />
      </div>
    </div>
  </header>
}