"use client"

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

interface ThemeButtonProps {
    className?: string
}

export default function ThemeButton({className}: ThemeButtonProps) { 

    const {theme, setTheme} = useTheme();

    return (
        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
    );
}