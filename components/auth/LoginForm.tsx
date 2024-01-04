"use client";

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
import { LoginSchema, LoginValidation } from "@/validation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  //------ form validation
  const form = useForm<LoginValidation>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //------ sending data to server
  const { mutate: login, isPending } = useMutation({
    mutationFn: async ({ email, password }: LoginValidation) => {
      const payload: LoginValidation = {
        email,
        password,
      };
      const { data } = await axios.post("/api/auth/login", payload);
      return data as string;
    },

    //------ handling server error
    onError: (data) => {
      form.reset();
      // FIX: for socail accounts(toast message not working)
      if (searchParams.get("error") === "OAuthAccountNotLinked") {
        return toast.error(
          "To confirm your identity, sign in with the same account you used originally."
        );
      }
      // FIX: ERROR HANDLING FROM SERVER
      return toast.error(data.message);
    },

    //------ after the server response
    onSuccess: (data) => {
      router.refresh();
      router.push("/settings");
      return toast.success(data);
    },
  });

  //------ preparing data
  const onSubmit = (values: LoginValidation) => {
    const payload: LoginValidation = {
      email: values.email,
      password: values.password,
    };
    login(payload);
  };
  return (
    <CardWrapper
      headerLabel="Log in to AuthFlow"
      authLabel="Don't have an account?"
      authLinklabel="Sign up"
      authLinkhref="/auth/signup"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="my-6">
          <div className="space-y-4">
            {/* EMAIL_INPUT_FIELD */}
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
            {/* PASSWORD_INPUT_FIELD */}
            <FormField
              control={form.control}
              name="password"
              disabled={isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground text-sm">
                    password
                  </FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" isLoading={isPending} className="w-full">
              Login
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
