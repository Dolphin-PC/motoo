"use client";
import React from "react";
import Input from "@/components/Input";
import CheckBox from "@/components/CheckBox";
import Link from "next/link";
import Button from "@/components/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { EErrorMessage, FormPattern } from "@/util/frontEnum";
import { signIn } from "next-auth/react";

export type TSignInProps = {
  email: string;
  password: string;
};

const SignInPage = () => {
  const { handleSubmit, control, reset, formState } = useForm<TSignInProps>({
    defaultValues: {
      email: "test@gmail.com",
      password: "qwerqwer",
    },
  });

  const onSubmit: SubmitHandler<TSignInProps> = (data) => {
    signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: "/",
    });
  };

  return (
    <>
      <h3 className="text-center mb-5 text-primary-500">Sign In</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <Input.Control<TSignInProps>
          control={control}
          name="email"
          rules={{
            required: EErrorMessage.REQUIRED,
            pattern: FormPattern.EMAIL,
          }}
          type="email"
        />

        <Input.Control<TSignInProps>
          control={control}
          name="password"
          rules={{
            required: EErrorMessage.REQUIRED,
            minLength: { value: 6, message: EErrorMessage.MINIMUM(6) },
          }}
          type="password"
        />

        <div className="flex justify-between items-center">
          <CheckBox name="remember" label="Remember Me" />
          <Link href="/account/sign-up" className="text-primary-500">
            Forgot password?
          </Link>
        </div>

        <Button type="submit">Sign In</Button>
      </form>
    </>
  );
};

export default SignInPage;
