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
import { Check } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// 👇 FORM SCHEMA : Register Form
const registerFormSchema = z.object({
  email: z.string().email("Invalid email format").min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
type RegisterFormValues = z.infer<typeof registerFormSchema>;

function RegisterPage(): JSX.Element {
  const router = useRouter();
  const { register: registerUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // ✅ ZOD-FORM HOOK :  custom hook initializes a form instance
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
  });

  // ✅ SUBMIT FORM - submit register form
  const onSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    console.log("🎯event_log:  🗝auth/register-page/submit:  💢 Triggered ");

    try {
      setIsLoading(true); //- Set loading spinner
      const { result, error } = await registerUser(email, password);

      if (error) {
        //- Handle specific error scenarios with appropriate messages
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
          //🤔 more conditions?
          default:
            toast.error("Hmmm... something went wrong. Please try again.");
            break;
        }
      } else {
        //- Handle successful registration
        console.log(
          "🎯event_log:  🗝auth/register-page/submit:  ✔ user has been successfully created - firebase result: ",
          result
        );
        setIsLoading(false); //- Reset loading state
        setSubmitted(true); //- Set achieved state
        setTimeout(() => {
          setSubmitted(false); //- Reset achieved state after a while
          toast.success("Successfully registered.");
          router.push("/onboarding");
        }, 1000);
      }
    } catch (error) {
      //- Handle other unexpected errors
      console.error(
        "🎯event_log:  🗝auth/register-page/submit:  ❌ something went wrong:",
        error
      );
      toast.error("Hmmm... something went wrong. Please try again.");
      setIsLoading(false); //- Reset loading state
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
            console.log(
              "🎯event_log:  📝 register form submitted with following form-data: ",
              data
            );
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
                    type="email"
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
                    className="text-left"
                    required
                    type="password"
                    id="password"
                    placeholder="password"
                    {...field}
                  />
                </FormControl>
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
