"use client";
import React, { useEffect, useState } from "react";
import Input from "@/components/Input";

import Button from "@/components/buttons/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { EErrorMessage, FormPattern } from "@/lib/util/frontEnum";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getUserTokenInfo } from "@/lib/util/util";
import { Checkbox, FormControlLabel } from "@mui/material";

export type TSignInProps = {
  email: string;
  password: string;
};

const IS_SAVE_ID = "IS_SAVE_ID";
const SAVED_EMAIL = "SAVED_EMAIL";

const SignInPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const { handleSubmit, control, setValue } = useForm<TSignInProps>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [checkedSaveId, setCheckedSaveId] = useState(false);

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
      const { appKey, appSecret } = getUserTokenInfo(session);

      if (checkedSaveId) {
        localStorage.setItem(SAVED_EMAIL, session?.user?.email || "");
        localStorage.setItem(IS_SAVE_ID, "Y");
      }

      router.replace(appKey && appSecret ? "/v/main" : "/v/my");
    }
  }, [status]);

  useEffect(() => {
    const isSaveId = localStorage.getItem(IS_SAVE_ID);
    const savedEmail = localStorage.getItem(SAVED_EMAIL);

    if (isSaveId === "Y") {
      setCheckedSaveId(true);
      setValue("email", savedEmail || "");
    }
  }, []);

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
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedSaveId}
                onChange={() => setCheckedSaveId((prev) => !prev)}
              />
            }
            label="ID 저장"
          />
          {/* <Link href="/account/sign-up" className="text-primary-500">
            Forgot password?
          </Link> */}
        </div>

        <Button primary type="submit">
          Sign In
        </Button>
      </form>
    </>
  );
};

export default SignInPage;
