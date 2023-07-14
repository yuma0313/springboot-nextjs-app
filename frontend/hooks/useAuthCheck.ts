import { useEffect } from "react";
import { useRouter } from "next/router";
import { useRole } from "../context/RoleContext";
import Cookie from "universal-cookie";

const cookie = new Cookie();

export const useAuthCheck = () => {
  const router = useRouter();
  const { setRole } = useRole();

  useEffect(() => {
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

      const data = await res.json();
      setRole(data);
    };
    checkAuth();
  }, []);
};
