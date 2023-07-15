import { useEffect, useState } from "react";
import { getEmployeeData } from "../libs/employees";

export const useGetEmployeeDetail = (id) => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      setLoading(true);
      const employeeData = await getEmployeeData(id);
      setEmployee(employeeData);
      setLoading(false);
    };
    if (id) {
      fetchEmployee();
    }
  }, [id]);

  return { employee, loading };
};
