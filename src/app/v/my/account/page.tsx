"use client";
import Button from "@/components/buttons/Button";
import InnerLayout from "@/components/layout/InnerLayout";
import AccountList from "./AccountList";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { AccountInfo } from "@/pages/model/AccountInfo";
import { fetchHelperWithData } from "@/lib/api/helper";

const MyAppKeyPage = () => {
  const { data: session } = useSession();
  const [accountInfoList, setAccountInfoList] = useState<AccountInfo[]>([]);

  useEffect(() => {
    if (session) {
      const fetchAccountInfoList = async () => {
        const accountList = await fetchHelperWithData<null, AccountInfo[]>({
          method: "GET",
          url: "/api/account/" + session.user.id,
        });

        setAccountInfoList(accountList.body || []);
      };

      fetchAccountInfoList();
    }
  }, [session]);

  return (
    <InnerLayout title="내 모의계좌 관리">
      <div className="flex flex-col gap-5">
        <AccountList accountInfoList={accountInfoList} />

        <Button.Link primary href="account/new">
          계좌등록하기
        </Button.Link>
      </div>
    </InnerLayout>
  );
};

export default MyAppKeyPage;
