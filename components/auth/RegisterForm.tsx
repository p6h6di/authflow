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
import { RegisterSchema, RegisterValidation } from "@/validation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

const RegisterForm = () => {
  //------ form validation
  const form = useForm<RegisterValidation>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  //------ sending data to server
  const { mutate: register, isPending } = useMutation({
    mutationFn: async ({ name, email, password }: RegisterValidation) => {
      const payload: RegisterValidation = {
        name,
        email,
        password,
      };
      const { data } = await axios.post("/api/auth/register", payload);
      return data as string;
    },

    //------ handling server error
    onError: (err) => {
      form.reset();
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast.error("User already exists.");
        }
        if (err.response?.status === 422) {
          return toast.error("Every field is required.");
        }
      }
      return toast.error("Could not create an account!");
    },

    //------ after the server response
    onSuccess: (data) => {
      return toast(data);
    },
  });

  //------ preparing data
  const onSubmit = (values: RegisterValidation) => {
    const payload: RegisterValidation = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    register(payload);
  };
  return (
    <CardWrapper
      headerLabel="Create a AuthFlow account"
      authLabel="Already have an account?"
      authLinklabel="Logn in"
      authLinkhref="/auth/login"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="my-6">
          <div className="space-y-4">
            {/* NAME_INPUT_FIELD */}
            <FormField
              control={form.control}
              name="name"
              disabled={isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground text-sm">
                    name
                  </FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              Create an account
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RegisterForm;
