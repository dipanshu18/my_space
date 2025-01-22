"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function LogoutBtn() {
  return (
    <Button>
      <LogOut /> Logout
    </Button>
  );
}
