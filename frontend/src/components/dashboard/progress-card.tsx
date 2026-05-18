import type { LucideIcon } from "lucide-react";
import { CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type ProgressCardProps = {
  description: string;
  icon: LucideIcon;
  progress: number;
  steps: string[];
  title: string;
};

export function ProgressCard({ description, icon: Icon, progress, steps, title }: ProgressCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start gap-4">
        <div className="rounded-md border border-primary/30 bg-primary/10 p-2 text-primary">
          <Icon className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="text-sm font-semibold text-foreground">Completion</span>
          <span className="text-sm font-semibold text-primary">{progress}%</span>
        </div>
        <Progress value={progress} />
        <div className="mt-5 space-y-3">
          {steps.map((step) => (
            <div className="flex items-center gap-3 text-sm text-muted-foreground" key={step}>
              <CheckCircle2 className="h-4 w-4 text-success" />
              <span>{step}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
