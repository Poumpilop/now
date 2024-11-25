import { Metadata } from "next"
import signupImage from "@/assets/signup-image.jpg"
import Image from "next/image"
import Link from "next/link"
import SignUpForm from "./SignUpForm"

export const metadata: Metadata = {
    title : "Sign Up"
}

export default function Page() {
    return <main className="flex h-screen items-center justify-center p-5">
        <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] rounded-2xl overflow-hidden bg-card shadow-2xl justify-center">
        <div className="md:w-1/2 w-full space-y-10 overflow-y-auto p-10 border rounded-md">
            <div className="space-y-1 text-center">
                <h1 className="text-3xl font-bold">S&apos;inscrire sur Now!</h1>
                <p className="text-muted-foreground">
                    Parler à travers le monde n&apos;a jamais autant été si facile.
                </p>
            </div>

            <div className="space-y-5">
                <SignUpForm />
                <Link href="/login" className="block text-center hover:underline">
                    Tu as déjà un compte ? Connecte toi
                </Link>
            </div>

        </div>
        </div>
    </main>
}