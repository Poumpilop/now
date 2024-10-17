import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="relative w-48 h-48 mx-auto">
          <div className="absolute inset-0 flex items-center justify-center animate-ping">
            <MapPin className="h-32 w-32 text-primary/20" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center animate-bounce">
            <MapPin className="h-24 w-24 text-primary" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold bg-background px-2 py-1 rounded-full">404</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Oups ! On s&apos;est perdu ?</h1>
        <p className="text-xl text-muted-foreground">
          Il semble que notre GPS social ait un peu déconné. Cette page est aussi introuvable qu&apos;un réseau en plein désert !
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild className="group">
            <Link href="/">
              <MapPin className="mr-2 h-4 w-4 transition-transform group-hover:rotate-[20deg]" />
              Retour à la civilisation
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}