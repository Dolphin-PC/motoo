"use client";
import React, { useEffect } from "react";
import Input from "@/components/Input";
import CheckBox from "@/components/CheckBox";
import Link from "next/link";
import Button from "@/components/buttons/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { EErrorMessage, FormPattern } from "@/lib/util/frontEnum";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getUserTokenInfo } from "@/lib/util/util";

export type TSignInProps = {
  email: string;
  password: string;
};

const SignInPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const { handleSubmit, control, reset, formState } = useForm<TSignInProps>({
    defaultValues: {
      email: "test@gmail.com",
      password: "qwerqwer",
    },
  });

  const onSubmit: SubmitHandler<TSignInProps> = async (data) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: "/v/main",
      redirect: false,
    }).then((res) => {
      if (res?.error) {
        alert(res.error);
      }
    });
  };

  useEffect(() => {
    if (status === "authenticated") {
      const { APP_KEY, APP_SECRET } = getUserTokenInfo(session);

      router.push(APP_KEY && APP_SECRET ? "/v/main" : "/v/my");
    }
  }, [status]);

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

        <Button primary type="submit">
          Sign In
        </Button>
      </form>
    </>
  );
};

export default SignInPage;
