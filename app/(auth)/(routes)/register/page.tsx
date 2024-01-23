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
import { useUserContext } from "@/components/providers/UserProvider";

const registerFormSchema = z.object({
  email: z.string().email("Invalid email format").min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
type RegisterFormValues = z.infer<typeof registerFormSchema>;

function RegisterPage(): JSX.Element {
  const router = useRouter();
  const { register, user } = useAuth();
  const { synchUserContext } = useUserContext();
  const [isLoading, setIsLoading] = useState(false); //-submit-button-loading-state
  const [submitted, setSubmitted] = useState(false); //-submit-button-success-state
  const [isShown, setIsShown] = useState(false); //-show-hide-password
  const togglePassword = () => {
    setIsShown((isShown) => !isShown);
  };
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
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
      const result = await register(trimmedEmail, trimmedPassword);

      if (result.success) {
        setIsLoading(false);
        setSubmitted(true);
        toast.success("Successfully registered.");
        router.push("/onboarding");
        setUserContext();
      } else {
        setIsLoading(false);
        handleRegistrationError(result.error);
      }
    } catch (error) {
      handleRegistrationError(error);
      setIsLoading(false);
    }
  };

  const setUserContext = () => {
    if (user?.uid) {
      synchUserContext(user.uid);
    }
  };

  const handleRegistrationError = (error: FirebaseError | unknown) => {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/email-already-in-use":
          toast.error(
            "This email is already in use. Please use a different email."
          );
          break;
        case "auth/invalid-email":
          toast.error("Please provide a valid email.");
          break;
        case "auth/weak-password":
          toast.error(
            "The password provided is too weak. Please use a stronger password."
          );
          break;
        default:
          toast.error("Hmmm... something went wrong. Please try again.");
          break;
      }
    } else {
      toast.error("Unknown error occurred. Please try again.");
    }
  };

  return (
    <div className="w-96 p-6">
      {/* HEADER */}
      <AuthFormHeader type="register" />

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
                <FormMessage />
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
                <FormMessage />
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
            {isLoading ? <Spinner /> : submitted ? <Check /> : "Register"}
          </Button>
        </form>
      </Form>

      {/* FOOTER */}
      <AuthFormFooter type="register" />
    </div>
  );
}

export default RegisterPage;
