"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import { Slider } from "@/components/ui/slider"


export default function RightSideBar() {

    const [postRadius, setPostRadius] = useState(5)

    return (
    <aside className="w-full md:w-80 space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <h2 className="font-semibold">Votre zone d&apos;intérêt</h2>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Rayon de découverte :</span>
                  <span className="font-medium">{postRadius} km</span>
                </div>
                <Slider
                  value={[postRadius]}
                  onValueChange={(value) => setPostRadius(value[0])}
                  max={50}
                  min={5}
                  step={5}
                  className="w-full"
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <h2 className="font-semibold">Activités locales</h2>
              </CardHeader>
              <CardContent className="space-y-2 pt-0">
                {[
                  { name: "OUE", date: "Mercredi", participants: 5019 },
                  { name: "Marché nocturne", date: "Vendredi, 18h", participants: 150 },
                  { name: "Course caritative", date: "Dimanche, 10h", participants: 80 },
                ].map((event, i) => (
                  <div key={i} className="flex items-center justify-between bg-secondary/50 p-2 rounded-md">
                    <div>
                      <p className="font-medium">{event.name}</p>
                      <p className="text-sm text-muted-foreground">{event.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{event.participants}</p>
                      <p className="text-xs text-muted-foreground">participants</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <h2 className="font-semibold">Groupes locaux actifs</h2>
              </CardHeader>
              <CardContent className="space-y-2 pt-0">
                {[
                  { name: "Photographes amateurs", members: 1200, posts: 25 },
                  { name: "Club de lecture", members: 450, posts: 12 },
                  { name: "Groupe de randonnée", members: 780, posts: 18 },
                ].map((group, i) => (
                  <div key={i} className="flex items-center justify-between bg-secondary/50 p-2 rounded-md">
                    <div>
                      <p className="font-medium">{group.name}</p>
                      <p className="text-sm text-muted-foreground">{group.members} membres</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{group.posts}</p>
                      <p className="text-xs text-muted-foreground">posts/jour</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </aside>
    );
}