"use client";
import React from "react";
import Input from "@/components/Input";
import CheckBox from "@/components/CheckBox";
import Link from "next/link";
import Button from "@/components/Button";
import { SubmitHandler, useForm } from "react-hook-form";

export type TSignInProps = {
  email: string;
  password: string;
};

const SignInPage = () => {
  const { handleSubmit, control, reset, formState } = useForm<TSignInProps>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<TSignInProps> = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <>
      <h3 className="text-center mb-5 text-primary-500">Sign In</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <Input.Control<TSignInProps>
          name="email"
          control={control}
          rules={{ required: true }}
          type="email"
        />

        <Input.Control<TSignInProps>
          name="password"
          control={control}
          rules={{ required: true }}
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
