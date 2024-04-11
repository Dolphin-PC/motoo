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
  const { register, handleSubmit } = useForm<TSignUpProps>();
  const onSubmit: SubmitHandler<TSignUpProps> = (data) => {
    alert(JSON.stringify(data));
  };

  const onClick = () => {
    fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify({
        email: "pcx474@gmail.com",
        password: "123456",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Sign Up Success");
        } else {
          alert("Sign Up Failed");
        }
        console.log(response);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div>
      <h3 className="text-center mb-5 text-primary-500">Create an Account</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <Input label="email" register={register} placeholder="Enter Email" />
        <Input
          label="password"
          register={register}
          placeholder="Enter Password"
        />
        <Input
          label="confirm"
          register={register}
          placeholder="Enter Password Again"
        />

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default SignUpPage;
