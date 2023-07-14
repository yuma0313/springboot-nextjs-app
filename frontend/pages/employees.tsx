import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookie from "universal-cookie";
import { getAllEmployeeData } from "../libs/employees";
import { useAuthCheck } from "../hooks/useAuthCheck";
import Layout from "../components/organisms/Layout";
import Link from "next/link";

const cookie = new Cookie();

const Employees = () => {
  const router = useRouter();
  const [employees, setEmployees] = useState([]);

  //カスタムフックで認証チェック
  useAuthCheck();

  useEffect(() => {
    const fetchEmployees = async () => {
      const employeesData = await getAllEmployeeData();
      setEmployees(employeesData);
    };
    fetchEmployees();
  }, []);

  return (
    <Layout title="一覧ページ">
      <div className="mx-auto w-full max-w-7xl px-6 py-6">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  氏名
                </th>
                <th scope="col" className="px-6 py-3">
                  部署名
                </th>
                <th scope="col" className="px-6 py-3">
                  役職
                </th>
                <th scope="col" className="px-6 py-3">
                  ステータス
                </th>
                <th scope="col" className="px-6 py-3">
                  入社日
                </th>
                <th scope="col" className="px-6 py-3">
                  メールアドレス
                </th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={index} className="bg-white border-b">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    <Link href={`/employees/${employee.employee_id}`}>
                      <div className="text-blue-600 underline cursor-pointer">
                        {employee.name}
                      </div>
                    </Link>
                  </th>
                  <td className="px-6 py-4">{employee.department_name}</td>
                  <td className="px-6 py-4">{employee.position_name}</td>
                  <td className="px-6 py-4">{employee.status}</td>
                  <td className="px-6 py-4">{employee.join_date}</td>
                  <td className="px-6 py-4">{employee.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Employees;
