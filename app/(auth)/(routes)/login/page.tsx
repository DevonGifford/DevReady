"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import login from "@/utils/firebase/auth/login";

function LoginPage(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // ⌛ Handle Form Submission - LOGIN
  const handleForm = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    // - Attempt to login with provided email and password
    const { result, error } = await login( email, password );

    if ( error ) {
      //- Display and log any sign-in errors
      console.log( error );
      return;
    }

    // - Sign in successful
    console.log( result );
    // 🎯🎯🎯 update context

    // - Redirect to the home page
    router.push( "/" );
  };

  return (
    <div className="w-96 rounded shadow p-6">
      {/* HEADER */}
      <div className="flex flex-col mb-8">
        <h1 className="text-3xl text-devready-green font-bold">
          Login to your account
        </h1>
        <p className="pt-3">
          By improving 1% a day, after 70 days ... <br/>
          <em> you will have doubled your skill level 🧠</em>
        </p>
      </div>

      <form onSubmit={handleForm} className="rounded space-y-4">
        {/* EMAIL */}
        <div>
          <label
            htmlFor="email"
            className="block mb-1 font-medium"
          >
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            name="email"
            id="email"
            placeholder="example@gmail.com"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-secondary leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {/* PASSWORD */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-1 font-medium"
          >
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            name="password"
            id="password"
            placeholder="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-secondary leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {/* SUBMIT BUTTON */}
        <Button type="submit" variant="devfill" className="w-full rounded">
          Login
        </Button>
        {/* LINKS */}
        <div className="flex flex-col py-4">
          <Link href="/">
            <Button type="button" variant="outline">
              Back to Home Page
            </Button>
          </Link>
          <Link href="/register">
            <Button type="button" variant="outline">
              Dont have an account?
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;

