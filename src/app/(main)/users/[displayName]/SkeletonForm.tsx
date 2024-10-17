import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function SkeletonForm() {
  return (
    <main className="max-w-3xl mx-auto p-4">
      <form>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle><Skeleton className="h-7 w-64" /></CardTitle>
            <CardDescription><Skeleton className="h-5 w-80" /></CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center space-y-2">
              <Skeleton className="w-24 h-24 rounded-full" />
              <Skeleton className="h-9 w-40" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button disabled>
              <Skeleton className="h-5 w-40" />
            </Button>
          </CardFooter>
        </Card>
      </form>
    </main>
  );
}