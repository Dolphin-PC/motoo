// "use client";
// import { useSession } from "next-auth/react";
// import { usePathname, useRouter } from "next/navigation";
// import React, { useEffect } from "react";

// const ClientInit = () => {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const pathname = usePathname();

//   useEffect(() => {
//     console.log("ClientInit");
//     if (status != "authenticated") return;
//     if (pathname == "/v/my") return;

//     // console.log(pathname);
//     // console.log(session);
//     if (!session.user.tokenInfo) throw new Error("Unauthorized");

//     const { tokenInfo } = session.user;

//     if (tokenInfo.APP_KEY == null || tokenInfo.APP_SECRET == null) {
//       if (confirm("Please enter your app key and secret.")) {
//         router.push("/v/my");
//       }
//     }
//   }, [status]);

//   return <></>;
// };

// export default ClientInit;
