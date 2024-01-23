"use client";

import { z } from "zod";
import { useAuth } from "@/components/providers/AuthProvider";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";
import AuthFormHeader from "../../_components/authFormHeader";
import AuthFormFooter from "../../_components/authFormFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Spinner } from "@/components/Spinner";
import { Check, EyeIcon, EyeOff } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FirebaseError } from "firebase/app";

const loginFormSchema = z.object({
  email: z.string().email("Invalid email format").min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
type LoginFormValues = z.infer<typeof loginFormSchema>;

function LoginPage(): JSX.Element {
  const router = useRouter();
  const { logIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false); //-submit-button-loading-state
  const [submitted, setSubmitted] = useState(false); //-submit-button-success-state
  const [isShown, setIsShown] = useState(false); //-show-hide-password
  const togglePassword = () => {
    setIsShown((isShown) => !isShown);
  };
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      setIsLoading(true);
      const trimmedEmail = email.trim();
      const trimmedPassword = password.trim();
      const result = await logIn(trimmedEmail, trimmedPassword);
      if (result.success) {
        setIsLoading(false);
        setSubmitted(true);
        toast.success("Successfully signed in");
        router.push("/dashboard");
      } else {
        setIsLoading(false);
        handleLoginError(result.error);
      }
    } catch (error) {
      handleLoginError(error);
    }
  };

  const handleLoginError = (error: FirebaseError | unknown) => {
    let errorMessage = "Something went wrong, please try again."; //-Default error message
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "User not found. Please check your credentials.";
          break;
        case "auth/wrong-password":
          errorMessage = "Incorrect password. Please try again.";
          break;
        case "auth/invalid-login-credentials":
          errorMessage = "Incorrect credentials. Please try again.";
          break;
        case "auth/network-request-failed":
        case "auth/timeout":
          errorMessage =
            "Network error. Please check your internet connection and try again.";
          break;
        // https://firebase.google.com/docs/auth/admin/errors
        default:
          errorMessage = "An unexpected error occurred. Please try again.";
          console.error("Firebase Authentication Error:", error);
          break;
      }
    }
    setIsLoading(false);
    toast.error(errorMessage);
  };

  return (
    <div className="w-96 p-6">
      {/* HEADER */}
      <AuthFormHeader type="login" />

      <Form {...form}>
        <form
          className="rounded space-y-4"
          onSubmit={form.handleSubmit((data) => {
            onSubmit(data);
          })}
        >
          {/* EMAIL */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex justify-start">
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="email"
                    id="email"
                    className="text-left"
                    {...field}
                  />
                </FormControl>
                <FormMessage data-testid="email-error" />
              </FormItem>
            )}
          />
          {/* PASSWORD */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex justify-start">
                  Secret Password
                </FormLabel>
                <FormControl>
                  <Input
                    className="text-left hide-reveal"
                    type={isShown ? "text" : "password"}
                    id="password"
                    placeholder="password"
                    {...field}
                  />
                </FormControl>
                <div
                  className="relative -translate-y-4 -translate-x-2 flex items-end justify-end cursor-pointer h-0"
                  onClick={togglePassword}
                  data-testid="toggle-password-vis"
                >
                  {isShown ? <EyeIcon size={22} /> : <EyeOff size={22} />}
                </div>
                <FormMessage data-testid="password-error" />
              </FormItem>
            )}
          />

          {/* REMEMBER ME CHECKBOX 🎯 */}
          <div className="flex items-center space-x-2 ml-2 text-sm">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me
            </label>
          </div>

          {/* SUBMIT BUTTON */}
          <Button type="submit" variant="devfill" className="w-full rounded">
            {isLoading ? <Spinner /> : submitted ? <Check /> : "Login"}
          </Button>
        </form>
      </Form>

      {/* FOOTER */}
      <AuthFormFooter type="login" />
    </div>
  );
}

export default LoginPage;
