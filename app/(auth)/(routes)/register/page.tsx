"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import AuthFormHeader from "../../_components/authFormHeader";
import AuthFormFooter from "../../_components/authFormFooter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Spinner } from "@/components/Spinner";
import { Check } from "lucide-react";

// 👇 FORM SCHEMA : Register Form
const registerFormSchema = z.object({
  email: z.string().email("Invalid email format").nonempty("Email is required"),
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
      const { result } = await registerUser(email, password);

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
    } catch (error) {
      console.error(
        "🎯event_log:  🗝auth/register-page/submit:  ❌ something went wrong:",
        error
      );
      toast.error("Hmmm... something went wrong  - please try again");
      setIsLoading(false); //- Reset loading state
    }
  };

  return (
    <div className="w-96 rounded shadow p-4 mx-2">
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
          <div className="flex items-center space-x-2 ml-2">
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
