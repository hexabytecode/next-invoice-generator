"use client";

import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="fixed m-0 p-0 flex flex-col justify-center items-center w-full h-full">
      <h1>
        This is the <strong>Invoice Generator App :)</strong>
      </h1>
      <div className="my-2">
        <Button className="mx-3">
          <LoginLink>Sign in</LoginLink>
        </Button>
        <Button className="mx-3">
          <RegisterLink>Sign up</RegisterLink>
        </Button>
      </div>
    </div>
  );
}
