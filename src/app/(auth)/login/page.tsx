import { Metadata } from "next";
import LoginForm from "./LoginForm";
import Link from "next/link";
import loginImage from "@/assets/login-image.jpg";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Login"
}

export default function Page() {
    return <main className="flex h-screen items-center justify-center p-5">
        <div className="flex justify-center h-full max-h-[40rem] w-full max-w-[64rem] rounded-2xl overflow-hidden bg-card shadow-2xl">
            <div className="md:w-1/2 w-full space-y-10 overflow-y-auto p-10 border rounded-md">
                <h1 className="text-center text-3xl font-bold">Se connecter sur Now!</h1>
                <div className="space-y-5">
                    <LoginForm />
                    <Link href="/signup" className="block text-center hover:underline">
                        Pas encore inscris? Par ici !
                    </Link>
                </div>
            </div>
        </div>
    </main>
}