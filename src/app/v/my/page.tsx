"use client";

import Button from "@/components/buttons/Button";
import LinkButton from "@/components/buttons/LinkButton";
import LogoutButton from "@/components/buttons/LogoutButton";
import { fetchHelperWithData } from "@/lib/api/helper";
import { EnumCResponseStatus } from "@/pages/api";
import { AccountInfo } from "@/pages/model/AccountInfo";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const MyPage = () => {
  const { data: session, status, update } = useSession();
  const [isAccountNull, setIsAccountNull] = useState(false);

  const fetchAccountInfo = async () => {
    if (status == "authenticated") {
      const { id } = session.user;
      const resData = await fetchHelperWithData<null, AccountInfo[]>({
        method: "GET",
        url: `/api/account/${id}`,
      });
      return resData.body;
    }
  };

  const getTokenInfoFromAccountList = (accountList: AccountInfo[]) => {
    let appKey = null;
    let appSecret = null;
    if (accountList.length) {
      const defaultAccount = accountList.find(
        (account) => account.defaultAccountYn
      );
      if (defaultAccount) {
        appKey = defaultAccount.appKey;
        appSecret = defaultAccount.appSecret;
      }
    }
    return { appKey, appSecret };
  };

  const onDeleteUser = async () => {
    if (!confirm("계정을 삭제하시겠습니까?")) return;

    if (status == "authenticated") {
      const { id } = session.user;
      const resData = await fetchHelperWithData<null, null>({
        method: "DELETE",
        url: `/api/user/${id}`,
      });

      if (resData.status === EnumCResponseStatus.SUCCESS) {
        alert(resData.message);
        signOut();
      }

      console.log(resData);
    }
  };
  useEffect(() => {
    fetchAccountInfo().then((res) => {
      if (res) {
        const { appKey, appSecret } = getTokenInfoFromAccountList(res);
        setIsAccountNull(appKey == null || appSecret == null);
      }
    });
  }, [status]);

  return (
    <div className="flex flex-col gap-5">
      <section>
        <h4>내 정보</h4>
        <div className="flex flex-col gap-2">
          <LinkButton href="/v/my/profile">프로필 설정</LinkButton>
          <LinkButton href="/v/my/account" warning={isAccountNull}>
            내 모의계좌 관리
          </LinkButton>
          {/* <LinkButton href="/v/my/profile">계좌 전환하기</LinkButton> */}
          <Button
            className="text-danger-500 border-danger-500 border-2"
            onClick={onDeleteUser}
          >
            계정 삭제하기
          </Button>
        </div>
      </section>
      <LogoutButton className="bg-primary-500 text-white">
        로그아웃
      </LogoutButton>
    </div>
  );
};

export default MyPage;
