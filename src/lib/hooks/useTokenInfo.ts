import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

export const useTokenInfo = async () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
};
