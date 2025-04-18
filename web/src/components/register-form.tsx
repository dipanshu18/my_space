"use client";

import { FaGoogle, FaGithub } from "react-icons/fa";

import { Button } from "@/components/ui/button";

export function RegisterForm() {
  async function handleRegisterWithGoogle() {
    window.open(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register/google`,
      "_self"
    );
  }

  async function handleRegisterWithGithub() {
    window.open(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register/github`,
      "_self"
    );
  }

  return (
    <div className="space-y-5 w-full my-5 max-w-xs mx-auto">
      <Button
        onClick={handleRegisterWithGoogle}
        className="w-full h-full py-5 text-lg"
      >
        <FaGoogle /> Continue with Google
      </Button>
      <Button
        onClick={handleRegisterWithGithub}
        className="w-full h-full py-5 text-lg"
      >
        <FaGithub /> Continue with Github
      </Button>
    </div>
  );
}
