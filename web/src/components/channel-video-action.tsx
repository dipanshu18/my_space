"use client";

import { PenBox, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function DeleteVideo() {
  return (
    <Button variant={"destructive"}>
      <Trash2 />
    </Button>
  );
}

export function EditVideo() {
  return (
    <Link href={"/channel/edit/:id"}>
      <Button>
        <PenBox />
      </Button>
    </Link>
  );
}
