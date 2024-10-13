"use client"

import { useSession } from "@/app/(main)/SessionProvider"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "./ui/dropdown-menu";
import UserAvatar from "./UserAvatar";
import Link from "next/link";
import { LogOutIcon, Monitor, Moon, Shield, Sun, UserIcon } from "lucide-react";
import { logout } from "@/app/(auth)/actions";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useQueryClient } from "@tanstack/react-query";

interface UserButtonProps {
    className?: string
}

export default function UserButton({className}: UserButtonProps) {

    const {user} = useSession();

    const {theme, setTheme} = useTheme();

    const queryClient = useQueryClient();

    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <button className={cn("flex-none rounded-full", className)}>
                <UserAvatar avatarUrl={user.avatarUrl} size={40} />
            </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Connecté en tant que</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.displayName}</p>
                  </div>
                </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {user.isAdmin && (
                <>
                <Link href={`/admin`}>
                <DropdownMenuItem>
                    <Shield  className="mr-2 h-4 w-4"/>
                    Administration
                </DropdownMenuItem>
            </Link>
            </>
            ) }
            
            <Link href={`/users/${user.username}`}>
                <DropdownMenuItem>
                    <UserIcon className="mr-2 h-4 w-4"/>
                    Profile
                </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => {
                queryClient.clear();
                logout();
                }}
            >
                <LogOutIcon className="mr-2 size-4" />
                Se déconnecter
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
}