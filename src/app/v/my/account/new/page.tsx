"use client";

import Input from "@/components/Input";
import Button from "@/components/buttons/Button";
import InnerLayout from "@/components/layout/InnerLayout";
import { fetchHelperWithData } from "@/lib/api/helper";
import { EErrorMessage, FormPattern } from "@/lib/util/frontEnum";
import { CResponse, EnumCResponseStatus } from "@/pages/api";
import {
  AccountInfo,
  AccountInfoValidatorGroups,
} from "@/pages/model/AccountInfo";
import { TIssueTokenRes } from "@/pages/service/token/TokenDao";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";

export type TNewAccount = {
  accountNumber: AccountInfo["accountNumber"];
  appKey: AccountInfo["appKey"];
  appSecret: AccountInfo["appSecret"];
};

const formOptions = {
  resolver: classValidatorResolver(AccountInfo, {
    validator: {
      groups: [AccountInfoValidatorGroups.verify],
    },
  }),
};

const VMyAccountNew = () => {
  const { handleSubmit, control, formState, getValues } =
    useForm<TNewAccount>(formOptions);

  const [isAccountValid, setIsAccountValid] = useState(false);

  const onValidate = async (data: TNewAccount) => {
    const res = await fetchHelperWithData<
      TNewAccount,
      CResponse<TIssueTokenRes>
    >({
      url: "/api/account/verify",
      data: data,
      method: "POST",
    });

    if (res.status == EnumCResponseStatus.INVALID) {
      alert(res.message);
      return;
    }

    alert("정상적으로 검증이 완료되었습니다.");

    setIsAccountValid(true);
  };

  const onAddNewAccount = () => {
    const { accountNumber, appKey, appSecret } = getValues();

    console.log(accountNumber, appKey, appSecret);
  };

  return (
    <InnerLayout title="모의계좌 등록하기">
      <form onSubmit={handleSubmit(onValidate)} className="flex flex-col gap-5">
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
          readOnly={isAccountValid}
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
          readOnly={isAccountValid}
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
          readOnly={isAccountValid}
        />
        <Button outline disabled={isAccountValid}>
          검증하기
        </Button>
        <Button
          primary
          type="button"
          disabled={!isAccountValid}
          onClick={onAddNewAccount}
        >
          추가하기
        </Button>
      </form>
    </InnerLayout>
  );
};

export default VMyAccountNew;
