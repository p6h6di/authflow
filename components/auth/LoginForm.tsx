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

const LoginForm = () => {
  //------ form validation
  const form = useForm<LoginValidation>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //------ sending data to server
  const onSubmit = (values: LoginValidation) => {
    console.log(values);
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
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
