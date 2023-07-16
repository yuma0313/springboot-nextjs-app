import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRole } from "../context/RoleContext";
import Cookie from "universal-cookie";

const cookie = new Cookie();

export const useAuthCheck = (requiredAuthority) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { setRole, role } = useRole();
  //roleがsetされるまでの時間をstateで管理する
  const [isRoleSet, setIsRoleSet] = useState(false);

  useEffect(() => {
    const fetchAuth = async () => {
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
      console.log(data);
      setRole(data);
      //roleのセットが完了したらisRoleSetをtrueに
      setIsRoleSet(true);
      setLoading(false);
    };
    fetchAuth();
  }, [router.asPath, setRole]);

  useEffect(() => {
    // isRoleSet が true のときのみ権限チェックを行う
    if (isRoleSet && !role.some((r) => r.authority === requiredAuthority)) {
      alert("権限がありません");
      router.push(`/employees`);
    }
  }, [router, role, requiredAuthority, isRoleSet, loading]);

  return { loading };
};
