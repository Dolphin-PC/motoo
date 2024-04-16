"use client";
import React from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export type TSignUpProps = {
  email: string;
  password: string;
  confirm: string;
};

const SignUpPage = () => {
  const { handleSubmit, control, reset } = useForm<TSignUpProps>({
    defaultValues: {
      email: "",
      password: "",
      confirm: "",
    },
  });

  const onSubmit: SubmitHandler<TSignUpProps> = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <div>
      <h3 className="text-center mb-5 text-primary-500">Create an Account</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <Input.Control<TSignUpProps>
          name="email"
          control={control}
          rules={{ required: true }}
        />
        <Input.Control<TSignUpProps>
          name="password"
          control={control}
          rules={{ required: true }}
        />
        <Input.Control<TSignUpProps>
          name="confirm"
          control={control}
          rules={{ required: true }}
        />

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default SignUpPage;
