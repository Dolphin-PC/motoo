"use client";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { TSignUpReq, TSignUpRes } from "@/pages/api/signup";
import { CResponse } from "@/pages/api";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const { handleSubmit, control, reset } = useForm<TSignUpReq>({
    defaultValues: {
      email: "",
      password: "",
      confirm: "",
    },
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<TSignUpReq> = async (data) => {
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const resData: CResponse<TSignUpRes> = await res.json();

      if (!res.ok || !resData.data) throw resData;

      // alert(resData.data.uid);

      // TODO redirect to sign in page
      if (confirm("회원가입 완료, 로그인페이지로 이동합니다.")) {
        router.push("/sign-in");
      }
    } catch (error) {
      if (CResponse.isCResponseError(error)) {
        const err = error as CResponse<string>;
        console.error(err);
        alert(err.message);
      } else if (error) {
        console.error("undefined error", error);
      }
    }
  };

  return (
    <div>
      <h3 className="text-center mb-5 text-primary-500">Create an Account</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <Input.Control<TSignUpReq>
          name="email"
          control={control}
          rules={{ required: true }}
          type="text"
        />
        <Input.Control<TSignUpReq>
          name="password"
          control={control}
          rules={{ required: true, minLength: 6 }}
          type="password"
        />
        <Input.Control<TSignUpReq>
          name="confirm"
          control={control}
          rules={{ required: true, minLength: 6 }}
          type="password"
        />

        <Button type="submit">Sign up</Button>
      </form>
    </div>
  );
};

export default SignUpPage;
