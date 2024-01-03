import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="bg-white border-2 border-gray-100 rounded-lg shadow-sm w-1/2">
        <div className="p-8">
          <h1 className="text-4xl font-bold">Authentication</h1>
          <p className="text-gray-700 text-sm">
            Welcome to my demo Next.js Authentication Project, where seamless
            user authentication meets the power of the React framework. This
            project is meticulously designed to provide a secure, efficient, and
            user-friendly authentication experience for your web application.
          </p>
          <Link href="/auth/login" className={buttonVariants({ size: "lg" })}>
            Get started
          </Link>
        </div>
      </div>
    </>
  );
}
