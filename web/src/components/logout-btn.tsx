"use client";

import type { FormEvent } from "react";
import axios from "axios";
import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";

export function LogoutBtn() {
  async function handleLogout(e: FormEvent) {
    e.preventDefault();

    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
      withCredentials: true,
    });

    window.location.replace("/");
  }

  return (
    <Button onClick={handleLogout}>
      <LogOut /> Logout
    </Button>
  );
}
