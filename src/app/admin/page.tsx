import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Metadata } from "next"
import prisma from "@/lib/prisma"
import { validateRequest } from "@/auth"
import { getUserDataSelect } from "@/lib/types"

export default async function Page() {
  
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">User Admin Panel</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pseudo</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status Admin</TableHead>
              <TableHead>Status Vérifié</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <GetAllUsers />
          </TableBody>
        </Table>
      </div>
    )
  }

async function GetAllUsers() {
    const { user } = await validateRequest();

    if(!user) return null;

    const initialUsers = await prisma.user.findMany({
        where: {
            NOT: {
                id: user?.id,
            },
        },
        select: getUserDataSelect(user.id),
        take: 5,
    });

    return (
        <>
        {initialUsers.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Switch
                  checked={user.isAdmin ?? undefined}
                  //onCheckedChange={() => toggleAdminStatus(user.id)}
                />
              </TableCell>
            </TableRow>
          ))}
          </>
    );
}