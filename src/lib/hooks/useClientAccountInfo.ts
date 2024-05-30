import "client-only";

import { AccountInfo } from "@/pages/model/AccountInfo";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

/** @desc 현재 로그인한 사용자의 계좌정보를 가져옵니다.(Only Client Side Render)
 */

export const useClientAccountInfo = (): AccountInfo => {
  const router = useRouter();
  const { data: session } = useSession();

  if (session?.user.currentAccountInfo?.accountNumber == null) {
    router.replace("/v/my/account");
    throw new Error("기본으로 설정된 계좌정보가 없습니다.");
  }
  return session?.user.currentAccountInfo;
};
