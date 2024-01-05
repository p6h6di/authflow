"use client";

import { Loader2 } from "lucide-react";
import CardWrapper from "./CardWrapper";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { toast } from "sonner";
import axios from "axios";

const VerificationForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");
  console.log(JSON.stringify(token));
  const onSubmit = useCallback(async () => {
    if (!token) {
      return toast.error("Token is missing.");
    }

    const payload = JSON.stringify(token);

    try {
      const { data } = await axios.post("/api/auth/new-verification", payload);
      toast.success(data);
      router.refresh();
      router.push("/settings");
      return data as string;
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <CardWrapper
      headerLabel="Confirming your verification email."
      authLabel="Back to login"
      authLinklabel="Log in"
      authLinkhref="/auth/login"
    >
      <div className="flex items-center justify-center">
        <Loader2 className="my-6 h-8 w-8 animate-spin" />
      </div>
    </CardWrapper>
  );
};

export default VerificationForm;
