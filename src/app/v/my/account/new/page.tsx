"use client";

import Input from "@/components/Input";
import Button from "@/components/buttons/Button";
import InnerLayout from "@/components/layout/InnerLayout";
import { EErrorMessage, FormPattern } from "@/lib/util/frontEnum";
import { fetchHelper } from "@/lib/util/util";
import { AccountInfo } from "@/pages/model/AccountInfo";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export type TNewAccount = {
  accountNumber: AccountInfo["accountNumber"];
  appKey: AccountInfo["appKey"];
  appSecret: AccountInfo["appSecret"];
};

const VMyAccountNew = () => {
  const { handleSubmit, control, reset, formState, getValues } =
    useForm<TNewAccount>({
      defaultValues: {
        accountNumber: 0,
        appKey: "",
        appSecret: "",
      },
    });

  const [isAccountValid, setIsAccountValid] = useState(false);

  const onValidate = async () => {
    const { accountNumber, appKey, appSecret } = getValues();
    // TODO 계좌인증하고, 토큰 발급받기

    const res = await fetchHelper<TNewAccount>({
      url: "/api/account/verify",
      data: { accountNumber, appKey, appSecret },
      method: "POST",
    });

    const data = await res.json();

    console.log(data);
  };

  const onSubmit = (data: TNewAccount) => {
    console.log(data);
  };

  return (
    <InnerLayout title="모의계좌 등록하기">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <Input.Control<TNewAccount>
          control={control}
          name="accountNumber"
          displayName="계좌번호"
          placeholder="계좌번호를 입력해주세요."
          rules={{
            required: EErrorMessage.REQUIRED,
            pattern: FormPattern.ACCOUNT_NUMBER,
          }}
          type="number"
        />
        <Input.Control<TNewAccount>
          control={control}
          name="appKey"
          //   displayName=""
          placeholder="한국투자증권에서 발급받은 APP_KEY를 입력해주세요."
          rules={{
            required: EErrorMessage.REQUIRED,
          }}
          type="text"
        />
        <Input.Control<TNewAccount>
          control={control}
          name="appSecret"
          //   displayName="계좌번호"
          placeholder="한국투자증권에서 발급받은 APP_SECRET을 입력해주세요."
          rules={{
            required: EErrorMessage.REQUIRED,
          }}
          type="password"
        />
        <Button outline type="button" onClick={onValidate}>
          검증하기
        </Button>
        <Button primary type="submit" disabled={!isAccountValid}>
          추가하기
        </Button>
      </form>
    </InnerLayout>
  );
};

export default VMyAccountNew;
