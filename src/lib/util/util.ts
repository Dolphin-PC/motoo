import { headers } from "next/headers";

export const getServerUrl = () => {
  const headersList = headers();
  const domain = headersList.get("host") || "";
  const fullUrl = headersList.get("referer") || "";

  return {
    fullUrl,
    url: fullUrl.split(domain)[1] || "",
  };
};
