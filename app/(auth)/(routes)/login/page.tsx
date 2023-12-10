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

// 👇 FORM SCHEMA : Login Form
const loginFormSchema = z.object({
  email: z.string().email("Invalid email format").nonempty("Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
type LoginFormValues = z.infer<typeof loginFormSchema>;

function LoginPage(): JSX.Element {
  const router = useRouter();
  const { logIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // ✅ ZOD-FORM HOOK :  custom hook initializes a form instance
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
  });

  // ✅ SUBMIT FORM - submit login form
  const onSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    console.log("🎯event_log:  🗝auth/login-page/submit:  💢 Triggered ");

    try {
      setIsLoading(true); //- Set loading spinner
      const { result } = await logIn(email, password);

      setIsLoading(false); //- Reset loading state
      setSubmitted(true); //- Set achieved state
      setTimeout(() => {
        setSubmitted(false); //- Reset achieved state after a while
        console.log(
          "🎯event_log:   🗝auth/login-page/submit:  ✔ Sign in successful - firebase result:  ",
          result
        );
        toast.success("Successfully signed in");
        // - Redirect to the home page
        router.push("/dashboard");
      }, 1000);
    } catch (error) {
      console.log(
        "🎯event_log:   🗝auth/login-page/submit:  ❌ Error in attempting to login: ",
        error
      );
      toast.error("Incorrect credentials, please try again."); //-no context, no custom toast
      setIsLoading(false); //- Reset loading state
    }
  };

  return (
    <div className="w-96 rounded shadow p-6">
      {/* HEADER */}
      <AuthFormHeader type="login" />

      <Form {...form}>
        <form
          className="rounded space-y-4"
          onSubmit={form.handleSubmit((data) => {
            console.log(
              "🎯event_log:  📝 login form submitted with following form-data: ",
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
