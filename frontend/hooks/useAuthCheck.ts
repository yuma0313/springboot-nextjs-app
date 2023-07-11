import { useEffect } from "react";
import { useRouter } from "next/router";
import Cookie from "universal-cookie";

const cookie = new Cookie();

export const useAuthCheck = (): void => {
  const router = useRouter();

  useEffect(() => {
    //ページが描画される前に認証チェック
    const checkAuth = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}auth/check`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (res.status !== 200) {
        router.push("/");
      }
    };
    checkAuth();
  }, []);
};
