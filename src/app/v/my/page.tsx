"use client";

import Button from "@/components/buttons/Button";
import LinkButton from "@/components/buttons/LinkButton";
import LogoutButton from "@/components/buttons/LogoutButton";
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
          <LinkButton href="/v/my/profile">프로필 설정</LinkButton>
          <LinkButton href="/v/my/account" warning={isAccountNull}>
            모의계좌 등록하기
          </LinkButton>
          <LinkButton href="/v/my/profile">계좌 전환하기</LinkButton>
          <Button outline>계정 삭제하기</Button>
        </div>
      </section>
      <LogoutButton className="bg-primary-500 text-white">
        로그아웃
      </LogoutButton>
    </div>
  );
};

export default MyPage;
