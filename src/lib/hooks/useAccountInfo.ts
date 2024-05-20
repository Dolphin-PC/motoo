"use server";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { AccountInfo } from "@/pages/model/AccountInfo";
import { getServerSession } from "next-auth";

const useAccountInfo = async (): Promise<AccountInfo> => {
  const session = await getServerSession(authOptions);

  if (session?.user.currentAccountInfo?.accountNumber == null) {
    throw new Error("기본으로 설정된 계좌정보가 없습니다.");
  }

  return session.user.currentAccountInfo;
};

export default useAccountInfo;
