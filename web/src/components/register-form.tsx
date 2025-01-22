"use client";

import { Button } from "@/components/ui/button";
import { FaGoogle, FaGithub } from "react-icons/fa";

export function RegisterForm() {
  return (
    <div className="space-y-5 w-full my-5 max-w-xs mx-auto">
      <Button className="w-full h-full py-5 text-lg">
        <FaGoogle /> Continue with Google
      </Button>
      <Button className="w-full h-full py-5 text-lg">
        <FaGithub /> Continue with Github
      </Button>
    </div>
  );
}
