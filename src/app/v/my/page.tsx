"use client";

import Button from "@/components/buttons/Button";
import { getUserTokenInfo } from "@/lib/util/util";
import { SessionContextValue, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const MyPage = () => {
  const { data: session, status, update } = useSession();
  const [isAppKeyNull, setIsAppKeyNull] = useState(false);
  useEffect(() => {
    if (status == "authenticated") {
      const { APP_KEY, APP_SECRET } = getUserTokenInfo(session);
      console.log(APP_KEY, APP_SECRET);
      setIsAppKeyNull(!(APP_KEY && APP_SECRET));
    }
  }, [status]);

  return (
    <div className="flex flex-col gap-5">
      <section>
        <h4>내 정보</h4>
        <div className="flex flex-col gap-2">
          <Button.Link href="/v/my/profile">프로필 설정</Button.Link>
          <Button.Link href="/v/my/profile" warning={isAppKeyNull}>
            APP 키 등록하기
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
