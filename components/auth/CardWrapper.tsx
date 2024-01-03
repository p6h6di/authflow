"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import SocialAccounts from "./SocialAccounts";
import { Separator } from "../ui/separator";
import { Icons } from "@/assets/Icons";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  authLabel: string;
  authLinklabel: string;
  authLinkhref: string;
  showSocial?: boolean;
}

const CardWrapper = ({
  children,
  headerLabel,
  authLabel,
  authLinklabel,
  authLinkhref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-[425px] p-8">
      <Icons.authentication className="w-12 h-12 mb-6" />
      <CardHeader className="text-2xl font-bold">{headerLabel}</CardHeader>
      <CardDescription className="mt-2">
        {authLabel}
        <Link
          href={authLinkhref}
          className="text-blue-600 underline underline-offset-1 ml-1"
        >
          {authLinklabel}
        </Link>
      </CardDescription>
      <CardContent>{children}</CardContent>

      {showSocial && (
        <CardFooter>
          <div className="flex items-center w-full">
            <Separator className="w-40" />
            <span className="text-muted-foreground text-sm mx-2 font-medium">
              OR
            </span>
            <Separator className="w-40" />
          </div>
          <SocialAccounts />
          <p className="text-xs text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="text-black hover:underline hover:underline-offset-1"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="text-black hover:underline hover:underline-offset-1"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </CardFooter>
      )}
    </Card>
  );
};

export default CardWrapper;
