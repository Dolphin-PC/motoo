import Button from "@/components/buttons/Button";
import InnerLayout from "@/components/layout/InnerLayout";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { AccountInfo } from "@/pages/model/AccountInfo";
import { getAccountInfoListByUserId } from "@/pages/service/user/UserService";
import { getServerSession } from "next-auth";
import React from "react";

const MyAppKeyPage = async () => {
  const session = await getServerSession(authOptions);
  let accountInfoList: AccountInfo[] = [];

  if (session?.user.id) {
    accountInfoList = await getAccountInfoListByUserId(session!.user.id);
  }
  return (
    <InnerLayout title="내 모의계좌 관리">
      {accountInfoList.length ? (
        accountInfoList
          .map((accountInfo) => {
            <h1>{accountInfo.accountNumber}</h1>;
          })
          .join("")
      ) : (
        <Button.Link primary href="account/new">
          계좌등록하기
        </Button.Link>
      )}
    </InnerLayout>
  );
};

export default MyAppKeyPage;
