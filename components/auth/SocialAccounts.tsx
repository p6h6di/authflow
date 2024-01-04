"use client";

import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { Icons } from "@/assets/Icons";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const SocialAccounts = () => {
  // authentication using social providers
  const authorize = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <>
      <Button
        variant="outline"
        className="w-full"
        onClick={() => authorize("google")}
      >
        <Icons.google className="w-5 h-5 mr-2" />
        <span className="text-sm font-medium">Continue with Google</span>
      </Button>
      <Button
        variant="outline"
        className="w-full"
        onClick={() => authorize("github")}
      >
        <Icons.github className="w-5 h-5 mr-2" />
        <span className="text-sm font-medium">Continue with Github</span>
      </Button>
    </>
  );
};

export default SocialAccounts;
