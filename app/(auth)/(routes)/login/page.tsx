"use client";

import * as z from "zod";
import toast from "react-hot-toast";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import AuthFormHeader from "../../_components/authFormHeader";
import AuthFormFooter from "../../_components/authFormFooter";

function LoginPage(): JSX.Element {
  const router = useRouter();
  const { logIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ⌛ Handle Form Submission - LOGIN
  const handleForm = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log("🎯event_log:  🗝auth/login-page/submit:  💢 Triggered ");

    // - Attempt to login with provided email and password
    const { result, error } = await logIn(email, password);

    if (error) {
      //  - Display and log any sign-in errors
      //🎯 create different errors for different messages.
      console.log(
        "🎯event_log:   🗝auth/login-page/submit:  ❌ Error in attempting to login: ",
        error
      );
      toast.error("Incorrect credentials, please try again."); //-no context, no custom toast
      return;
    }

    // - Sign in successful
    console.log(
      "🎯event_log:   🗝auth/login-page/submit:  ✔ Sign in successful - firebase result:  ",
      result
    );
    toast.success("Successfully signed in"); //-no context, no custom toast

    // - Redirect to the home page
    router.push("/dashboard");
  };

  return (
    <div className="w-96 rounded shadow p-6">
      {/* HEADER */}
      <AuthFormHeader type="login" />

      <form onSubmit={handleForm} className="rounded space-y-4">
        {/* EMAIL */}
        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            name="email"
            id="email"
            placeholder="example@gmail.com"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {/* PASSWORD */}
        <div className="mb-6">
          <label htmlFor="password" className="block mb-1 font-medium">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            name="password"
            id="password"
            placeholder="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {/* SUBMIT BUTTON */}
        <Button type="submit" variant="devfill" className="w-full rounded">
          Login
        </Button>
      </form>

      {/* FOOTER */}
      <AuthFormFooter type="login" />
    </div>
  );
}

export default LoginPage;
