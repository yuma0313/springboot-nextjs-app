import { useRouter } from "next/router";
import { useAuthCheck } from "../../hooks/useAuthCheck";
import Layout from "../../components/organisms/Layout";
import { useGetEmployeeDetail } from "../../hooks/useEmployeeDetail";

const EmployeeDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  //カスタムフックで詳細データ取得
  const { employee, loading } = useGetEmployeeDetail(id);

  //カスタムフックで認証チェック
  useAuthCheck("CAN_VIEW");

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout title="詳細ページ">
      <div className="container mx-auto max-w-[1200px] mt-10 px-6 py-6 bg-white shadow rounded-md min-h-[calc(100vh_-_150px)]">
        <div className="flex items-center mb-2">
          <button
            className="bg-teal-500 text-white font-bold py-2 px-4 rounded"
            onClick={() => router.push(`/employees/edit/${id}`)}
          >
            従業員情報を編集する
          </button>
        </div>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 divide-y md:divide-y-0">
          <div className="flex flex-col py-3 space-y-3">
            <div className="flex flex-col min-h-[85px] md:border-b py-3">
              <dt className="mb-1 text-gray-500 md:text-lg">氏名</dt>
              <dd className="text-lg font-normal pl-3">{employee.name}</dd>
            </div>
            <div className="flex flex-col min-h-[85px] md:border-b py-3">
              <dt className="mb-1 text-gray-500 md:text-lg">メールアドレス</dt>
              <dd className="text-lg font-normal pl-3">{employee.email}</dd>
            </div>
            <div className="flex flex-col min-h-[85px] md:border-b py-3">
              <dt className="mb-1 text-gray-500 md:text-lg">電話番号</dt>
              <dd className="text-lg font-normal pl-3">
                {employee.phone_number}
              </dd>
            </div>
            <div className="flex flex-col min-h-[85px] md:border-b py-3">
              <dt className="mb-1 text-gray-500 md:text-lg">ステータス</dt>
              <dd className="text-lg font-normal pl-3">{employee.status}</dd>
            </div>
            <div className="flex flex-col min-h-[85px] md:border-b py-3">
              <dt className="mb-1 text-gray-500 md:text-lg">入社日</dt>
              <dd className="text-lg font-normal pl-3">{employee.join_date}</dd>
            </div>
          </div>
          <div className="flex flex-col py-3 space-y-3">
            <div className="flex flex-col min-h-[85px] md:border-b py-3">
              <dt className="mb-1 text-gray-500 md:text-lg">退職日</dt>
              <dd className="text-lg font-normal pl-3">
                {employee.leave_date}
              </dd>
            </div>
            <div className="flex flex-col min-h-[85px] md:border-b py-3">
              <dt className="mb-1 text-gray-500 md:text-lg">役職</dt>
              <dd className="text-lg font-normal pl-3">
                {employee.position_name}
              </dd>
            </div>
            <div className="flex flex-col min-h-[85px] md:border-b py-3">
              <dt className="mb-1 text-gray-500 md:text-lg">部署名</dt>
              <dd className="text-lg font-normal pl-3">
                {employee.department_name}
              </dd>
            </div>
            <div className="flex flex-col min-h-[85px] md:border-b py-3">
              <dt className="mb-1 text-gray-500 md:text-lg">権限</dt>
              <dd className="text-lg font-normal pl-3">{employee.role_name}</dd>
            </div>
          </div>
        </dl>
      </div>
    </Layout>
  );
};

export default EmployeeDetail;
