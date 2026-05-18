import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6 text-foreground">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Route not found</CardTitle>
          <CardDescription>The enterprise foundation does not define this surface yet.</CardDescription>
        </CardHeader>
        <CardContent>
          <ButtonLink href="/">Return to foundation</ButtonLink>
        </CardContent>
      </Card>
    </main>
  );
}
