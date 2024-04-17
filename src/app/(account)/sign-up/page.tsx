"use client";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { TSignUpReq, TSignUpRes } from "@/pages/api/signup";
import { CResponse } from "@/pages/api";

const SignUpPage = () => {
  const { handleSubmit, control, reset } = useForm<TSignUpReq>({
    defaultValues: {
      email: "",
      password: "",
      confirm: "",
    },
  });

  const onSubmit: SubmitHandler<TSignUpReq> = async (data) => {
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const resData: CResponse<TSignUpRes> = await res.json();

      if (!res.ok || !resData.data) throw resData;

      alert(resData.data.uid);

      // TODO redirect to sign in page
    } catch (error) {
      if (CResponse.isCResponseError(error)) {
        const err = error as CResponse<string>;
        console.error(err);
        alert(err.message);
      } else {
        console.error("undefined error", error);
      }
    }

    //   .then((res) => {
    //     if (res.status !== 200) throw res.json();
    //     return res.json();
    //   })
    //   .catch((error) => {
    //     if (error instanceof FirebaseError) {
    //       console.error(error);
    //       alert(error.message);
    //     } else {
    //       console.error("undefined error", error);
    //     }
    //   });

    // console.log(res);
  };

  return (
    <div>
      <h3 className="text-center mb-5 text-primary-500">Create an Account</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <Input.Control<TSignUpReq>
          name="email"
          control={control}
          rules={{ required: true }}
        />
        <Input.Control<TSignUpReq>
          name="password"
          control={control}
          rules={{ required: true }}
        />
        <Input.Control<TSignUpReq>
          name="confirm"
          control={control}
          rules={{ required: true }}
        />

        <Button type="submit">Sign up</Button>
      </form>
    </div>
  );
};

export default SignUpPage;
