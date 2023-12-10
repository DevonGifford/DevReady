"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import AuthFormHeader from "../../_components/authFormHeader";
import AuthFormFooter from "../../_components/authFormFooter";

function Page(): JSX.Element {
  const router = useRouter();
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ⌛ Handle Form Submission - REGISTER
  const handleForm = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log("🎯event_log:  🗝auth/register-page/submit:  💢 Triggered ");

    //- Attempt to sign up with provided email and password
    const { result, error } = await register(email, password);

    if (error) {
      //  - Display and log any sign-up errors
      //🎯 create different errors for different messages.
      console.log(
        "🎯event_log:  🗝auth/register-page/submit:  ❌ somethig went wrong:",
        error
      );
      toast.error("Hmmm... something went wrong  - please try again"); //🎯 clean this up
      return;
    }

    //- Register successful
    console.log(
      "🎯event_log:  🗝auth/register-page/submit:  ✔ user has been successfully created - firebase result: ",
      result
    );
    toast.success("Successfully registered.");

    //- Redirect to the home page
    router.push("/onboarding");
  };

  return (
    <div className="w-96 rounded shadow p-6">
      {/* HEADER */}
      <AuthFormHeader type="register" />

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
        <div>
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
          Register
        </Button>
      </form>

      {/* FOOTER */}
      <AuthFormFooter type="register" />
    </div>
  );
}

export default Page;
