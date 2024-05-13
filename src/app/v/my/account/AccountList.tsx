"use client";

import { fetchHelperWithData } from "@/lib/api/helper";
import { TChangeDefaultAccount } from "@/pages/api/account/default";
import { AccountInfo } from "@/pages/model/AccountInfo";
import React, { useEffect } from "react";

const AccountList = ({
  accountInfoList,
}: {
  accountInfoList: AccountInfo[];
}) => {
  const [selectedAccount, setSelectedAccount] = React.useState<string>("");

  useEffect(() => {
    const defaultAccount = accountInfoList.find(
      (accountInfo) => accountInfo.defaultAccountYn
    );
    setSelectedAccount(defaultAccount?.accountNumber || "");
  }, [accountInfoList]);

  const handleRadioChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newAccountNumber = event.target.value;
    if (confirm("기본 계좌로 설정하시겠습니까?")) {
      await fetchHelperWithData<TChangeDefaultAccount, string>({
        method: "POST",
        url: "/api/account/default",
        data: {
          prevAccountNumber: selectedAccount,
          newAccountNumber: newAccountNumber,
        },
      });
      setSelectedAccount(newAccountNumber);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {accountInfoList.map((accountInfo, index) => {
        const isSelected = accountInfo.accountNumber === selectedAccount;
        return (
          <div
            key={accountInfo.accountNumber}
            className="flex items-center justify-between"
          >
            <div className="flex gap-2 items-center">
              <input
                type="radio"
                id={`account-${index}`}
                name="account"
                value={accountInfo.accountNumber}
                checked={isSelected}
                className="w-6 h-6"
                onChange={handleRadioChange}
              />
              <label htmlFor={`account-${index}`} className="p-2">
                <span>{accountInfo.accountNumber}</span>
                {isSelected && (
                  <span className="border-2 ml-2 p-1 rounded-full text-primary-500">
                    Active Now
                  </span>
                )}
              </label>
            </div>
            <div className="flex gap-2">
              {/* <Button outline>Edit</Button> */}
              {/* {accountInfo.defaultAccountYn == false && (
            <Button outline>Delete</Button>
          )} */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AccountList;
