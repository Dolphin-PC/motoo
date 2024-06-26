"use client";

import Input from "@/components/Input";
import Button from "@/components/buttons/Button";
import InnerLayout from "@/components/layout/InnerLayout";
import { fetchHelperWithData } from "@/lib/api/helper";
import { StatusCode } from "@/pages/api";
import { AccountInfo, AccountInfoValidatorGroups } from "@/model/AccountInfo";
import { TIssueTokenRes } from "@/service/token/TokenDao";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Tooltip from "@/components/tooltip/Tooltip";

export type TVerifyAccount = {
  accountNumber: AccountInfo["accountNumber"];
  appKey: AccountInfo["appKey"];
  appSecret: AccountInfo["appSecret"];
};

export type TNewAccount = TVerifyAccount & {
  apiToken: AccountInfo["apiToken"];
  apiTokenExpiredAt: AccountInfo["apiTokenExpiredAt"];
  htsId: AccountInfo["htsId"];
};

const VMyAccountNew = () => {
  const { data: session, update } = useSession();
  const { handleSubmit, control, formState, getValues } = useForm<AccountInfo>({
    resolver: classValidatorResolver(AccountInfo, {
      validator: {
        groups: [AccountInfoValidatorGroups.verify],
      },
    }),
    defaultValues: {
      accountNumber: "",
      appKey: "",
      appSecret: "",
      htsId: "",
    },
  });
  const [newAccountInfo, setNewAccountInfo] = useState<TNewAccount>();

  const [isAccountValid, setIsAccountValid] = useState(false);

  const router = useRouter();

  const onValidate = async (data: TNewAccount) => {
    const res = await fetchHelperWithData<TNewAccount, TIssueTokenRes>({
      url: "/api/account/verify",
      data: data,
      method: "POST",
    });

    if (res.status == StatusCode.INVALID) {
      alert(res.message);
      return;
    }

    setNewAccountInfo({
      accountNumber: data.accountNumber,
      appKey: data.appKey,
      appSecret: data.appSecret,
      apiToken: res.body?.access_token || null,
      apiTokenExpiredAt: res.body?.access_token_token_expired || null,
      htsId: data.htsId,
    });

    alert("정상적으로 검증이 완료되었습니다.");

    setIsAccountValid(true);
  };

  const onAddNewAccount = async () => {
    fetchHelperWithData<TNewAccount, AccountInfo>({
      url: "/api/account/new",
      data: newAccountInfo,
      method: "POST",
    }).then(async (res) => {
      alert(res.message);
      await update({
        ...session?.user,
        currentAccountInfo: newAccountInfo,
      });
      router.replace("/v/my/account");
    });
  };

  return (
    <InnerLayout title="모의계좌 등록하기">
      <form
        onSubmit={handleSubmit(onValidate)}
        className="p-5 flex flex-col gap-5"
      >
        <Input.Control<AccountInfo>
          control={control}
          name="accountNumber"
          displayName="계좌번호"
          placeholder="계좌번호를 입력해주세요."
          type="number"
          readOnly={isAccountValid}
        />
        <Input.Control<AccountInfo>
          control={control}
          name="appKey"
          //   displayName=""
          placeholder="한국투자증권에서 발급받은 APP_KEY를 입력해주세요."
          type="password"
          readOnly={isAccountValid}
        />
        <Input.Control<AccountInfo>
          control={control}
          name="appSecret"
          //   displayName="계좌번호"
          placeholder="한국투자증권에서 발급받은 APP_SECRET을 입력해주세요."
          type="password"
          readOnly={isAccountValid}
        />
        <div>
          <Input.Control<AccountInfo>
            control={control}
            name="htsId"
            //   displayName="계좌번호"
            placeholder="@000000"
            type="password"
            readOnly={isAccountValid}
          />
          <Tooltip title="">
            <small>실시간체결통보를 위해 정확한 HTS_ID를 입력해주세요.</small>
          </Tooltip>
        </div>

        <div className="flex flex-col">
          <div className="flex gap-2">
            <Image src="/icons/check.svg" width={24} height={24} alt="check" />
            <p>확인해주세요.</p>
          </div>
          <p>
            <Link
              href="https://securities.koreainvestment.com/main/customer/systemdown/RestAPIService.jsp"
              className="underline"
              target="_blank"
            >
              한국투자증권
            </Link>
            에서 발급받은 모의투자계좌정보를 입력해주세요.
          </p>
        </div>

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
