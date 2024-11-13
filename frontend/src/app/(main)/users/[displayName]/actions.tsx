"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent} from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BadgeCheck, Calendar, Edit, Flag, MapPin, MoreVertical } from "lucide-react";
import Link from "next/link";
import ForYouFeed from "../../ForYouFeed";
import { UserData } from "@/lib/types";
import { formatJoinDate } from "@/lib/utils"
import { useState } from "react";
import { ReportModal } from "@/components/ReportModal";

interface ProfilePageProps {
  user: UserData;
}

export default function ProfileForm({ user }: ProfilePageProps) {

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

      const handleReport = () => {
        setIsReportModalOpen(true);
      }
    

  return (
    <>
    <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        userId={user.id}
      />

    <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
          <section className="flex-grow space-y-6 max-w-4xl">
            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center md:flex-row md:items-start gap-6">
                  <Avatar className="w-32 h-32">
                    <AvatarImage src={user.avatarUrl || undefined} alt={user.displayName} />
                    <AvatarFallback>{user.displayName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <h1 className="text-3xl font-bold">{user.displayName}</h1>

                        <BadgeCheck className="relative w-6 h-6 fill-blue-500 text-white rounded-full" />

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => handleReport()}>
                            <Flag className="mr-2 h-4 w-4" />
                            <span>Signaler</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <p className="text-muted-foreground">{user.username}</p>
                    <p className="mt-2">{user.bio}</p>
                    <div className="flex items-center justify-center md:justify-start mt-2 text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>user.location</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start mt-2 text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>Membre depuis {formatJoinDate(user.createdAt)}</span>
                    </div>
                    <div className="flex justify-center md:justify-start gap-4 mt-4">
                      <div>
                        <span className="font-bold">{user._count.followers}</span> abonnés
                      </div>
                      <div>
                        <span className="font-bold">{user._count.following}</span> abonnements
                      </div>
                      <div>
                        <span className="font-bold">{user._count.posts}</span> posts
                      </div>
                    </div>
                    <div className="flex justify-center md:justify-start gap-2 mt-4">
                      <Button asChild>
                        <Link href="/edit-profile">
                          <Edit className="w-4 h-4 mr-2" />
                          Modifier le profil
                        </Link>
                      </Button>
                      <Button variant="outline">
                        Suivre
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="posts" className="w-full">
              <TabsList>
                <TabsTrigger value="posts">Posts</TabsTrigger>
                
                <TabsTrigger value="photos">Photos</TabsTrigger>
              </TabsList>
              <TabsContent value="posts">
                <ForYouFeed displayName={user.displayName}/>
              </TabsContent>
              <TabsContent value="photos">
                <div className="grid grid-cols-3 gap-4">
                  
                </div>
              </TabsContent>
            </Tabs>
          </section>
        </div>
      </main>
      </>
  );
}