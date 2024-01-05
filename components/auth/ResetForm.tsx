"use client";

import React from "react";
import CardWrapper from "./CardWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ResetSchema, ResetValidation } from "@/validation";
import axios, { AxiosError } from "axios";

const ResetForm = () => {
  const router = useRouter();

  //------ form validation
  const form = useForm<ResetValidation>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  //------ sending data to server
  const { mutate: resetPassword, isPending } = useMutation({
    mutationFn: async ({ email }: ResetValidation) => {
      const payload: ResetValidation = {
        email,
      };
      const { data } = await axios.post("/api/auth/reset", payload);
      return data as string;
    },

    //------ handling server error
    onError: (err) => {
      form.reset();
      return toast.error(err.message);
    },

    //------ after the server response
    onSuccess: (data) => {
      return toast.success(data);
    },
  });

  //------ preparing data
  const onSubmit = (values: ResetValidation) => {
    const payload: ResetValidation = {
      email: values.email,
    };
    resetPassword(payload);
  };
  return (
    <CardWrapper
      headerLabel="Reset Password"
      authLabel="Already have an account?"
      authLinklabel="Login"
      authLinkhref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="my-6">
          <div className="space-y-3">
            {/* PASSWORD_INPUT_FIELD */}
            <FormField
              control={form.control}
              name="email"
              disabled={isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground text-sm">
                    email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="name@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!isPending ? (
              <Button type="submit" className="w-full">
                Send reset password link
              </Button>
            ) : (
              <Button type="submit" isLoading={isPending} className="w-full" />
            )}
            <Button
              type="submit"
              onClick={() => router.back()}
              variant="outline"
              className="w-full"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ResetForm;
