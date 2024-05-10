"use client";

import Button from "@/components/buttons/Button";
import { getUserTokenInfo } from "@/lib/util/util";
import { SessionContextValue, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const MyPage = () => {
  const { data: session, status, update } = useSession();
  const [isAccountNull, setIsAccountNull] = useState(false);
  useEffect(() => {
    if (status == "authenticated") {
      const { appKey: app_key, appSecret: app_secret } =
        getUserTokenInfo(session);
      // console.log(app_key, app_secret);
      if (app_key == null || app_secret == null) {
        console.warn("하나 이상의 모의계좌를 등록해주세요.");
        setIsAccountNull(true);
      }
    }
  }, [status]);

  return (
    <div className="flex flex-col gap-5">
      <section>
        <h4>내 정보</h4>
        <div className="flex flex-col gap-2">
          <Button.Link href="/v/my/profile">프로필 설정</Button.Link>
          <Button.Link href="/v/my/account" warning={isAccountNull}>
            모의계좌 등록하기
          </Button.Link>
          <Button.Link href="/v/my/profile">계좌 전환하기</Button.Link>
          <Button outline>계정 삭제하기</Button>
        </div>
      </section>
      <Button.Logout className="bg-primary-500 text-white">
        로그아웃
      </Button.Logout>
    </div>
  );
};

export default MyPage;
