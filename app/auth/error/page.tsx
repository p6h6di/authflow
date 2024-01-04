"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const AuthErrorPage = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center w-1/2 space-y-4 border-2 border-gray-100 p-6 rounded-lg">
      <p>
        To confirm your identity, sign in with the same account you used
        originally.
      </p>
      <Button
        onClick={() => router.back()}
        variant="outline"
        className="cursor-pointer"
      >
        Cancel
      </Button>
    </div>
  );
};

export default AuthErrorPage;
