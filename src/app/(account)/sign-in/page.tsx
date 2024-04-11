import React from "react";
import AccountLayout from "../layout";
import Input from "@/components/Input";
import CheckBox from "@/components/CheckBox";
import Link from "next/link";
import Button from "@/components/Button";

const SignInPage = () => {
  return (
    <>
      <h3 className="text-center mb-5 text-primary-500">Sign In</h3>

      <div className="flex flex-col gap-5">
        <Input title="ID" placeholder="Enter ID" type="text" />
        <Input title="Password" placeholder="Enter Password" type="password" />

        <div className="flex justify-between items-center">
          <CheckBox name="remember" label="Remember Me" />
          <Link href="/account/sign-up" className="text-primary-500">
            Forgot password?
          </Link>
        </div>

        <Button>Sign In</Button>
      </div>
    </>
  );
};

export default SignInPage;
