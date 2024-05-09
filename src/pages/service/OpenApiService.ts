import { fetchHelper } from "@/lib/util/util";
import { AccountInfo } from "../model/AccountInfo";

export const issueAppToken = async (data: AccountInfo) => {
  console.log(data);
  //   await fetchHelper({
  //     method: "POST",
  //     url: `${process.env.VTS_URL}/oauth2/tokenP`,
  //     data: {
  //       grant_type: "client_credentials",
  //       appKey: data.appKey,
  //       appSecret: data.appSecret,
  //     },
  //   });
};
