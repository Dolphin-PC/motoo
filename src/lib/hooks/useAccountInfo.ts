"use server";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { AccountInfo } from "@/pages/model/AccountInfo";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const useAccountInfo = async (): Promise<AccountInfo> => {
  const session = await getServerSession(authOptions);

  // FIXME 최초 계좌 등록시, next-auth의 update로 token을 갱신하는데, (v/my/account/new/page.tsx)
  // 이때, session.user.currentAccountInfo가 null이라서 redirect가 발생함. (새로고침하면 정상적으로 동작함.)
  if (session?.user.currentAccountInfo?.accountNumber == null) {
    redirect("/v/my/account");
    throw new Error("기본으로 설정된 계좌정보가 없습니다.");
  }

  return session.user.currentAccountInfo;
};

export default useAccountInfo;
