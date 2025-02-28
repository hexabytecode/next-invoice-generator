"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ActionCardTypes } from "@/types/ui/actionCardTypes";
import { FilePlus, FileText } from "lucide-react";
import Link from "next/link";

const icons = {
  FilePlus,
  FileText,
};

export function ActionCard({
  id,
  iconName,
  title,
  description,
  buttonText,
}: ActionCardTypes) {
  const Icon = icons[iconName];
  return (
    <Card className="p-4 max-w-md">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Icon className="w-6 h-6" />
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button>
          <Link href={`/${id}`}>{buttonText}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
