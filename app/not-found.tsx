import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function NotFound() {
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-10">
      <h3 className="flex flex-col gap-1 text-lg font-semibold leading-none tracking-tight text-center">
        <span className="text-2xl">Oh no...</span>
        <span>This is a little embarassing...</span>
      </h3>
      <h4 className="flex flex-col  justify-center items-center py-4 text-3xl">
        <span>We lost this page it seems </span>
        <span>🙈</span>
      </h4>

      <Link href={"/dashboard"}>
        <Button>Take me Home</Button>
      </Link>
    </div>
  );
}

export default NotFound;
