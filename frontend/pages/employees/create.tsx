import { useRouter } from "next/router";
import { useAuthCheck } from "../../hooks/useAuthCheck";
import { postEmployeeData } from "../../libs/employees";
import Layout from "../../components/organisms/Layout";
import { useForm } from "react-hook-form";

const EmployeeCreate = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      status: "",
      joinDate: "",
      leaveDate: "",
      positionId: null,
      departmentId: null,
      roleId: null,
      password: "password",
    },
  });

  //カスタムフックで認証チェック
  const { loading } = useAuthCheck("CAN_ADD");

  if (loading) {
    return <div>Loading...</div>;
  }

  const onSubmit = async (data) => {
    // 各プルダウンメニューが選択されているかチェック
    if (!data.departmentId || !data.positionId || !data.roleId) {
      alert("すべてのプルダウンメニューを選択してください");
      return; // 早期リターンで処理を終了
    }

    try {
      await postEmployeeData(data);
      router.push("/employees");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Layout title="登録ページ">
      <div className="container mx-auto max-w-[1200px] mt-10 px-6 py-6 bg-white shadow rounded-md min-h-[calc(100vh-_150px)]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-start mb-4">
            <button
              type="submit"
              className="bg-teal-500 text-white font-bold py-2 px-4 rounded"
            >
              登録
            </button>
          </div>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 divide-y md:divide-y-0">
            <div className="flex flex-col py-3 space-y-3">
              <div className="flex flex-col min-h-[85px] md:border-b py-3">
                <dt className="mb-1 text-gray-500 md:text-lg">氏名</dt>
                <dd className="text-lg font-normal pl-3">
                  <input
                    type="text"
                    {...register("name", { required: "氏名は必須項目です。" })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none text-gray-700"
                  />
                  {errors.name && <p>{errors.name.message}</p>}
                </dd>
              </div>
              <div className="flex flex-col min-h-[85px] md:border-b py-3">
                <dt className="mb-1 text-gray-500 md:text-lg">
                  メールアドレス
                </dt>
                <dd className="text-lg font-normal pl-3">
                  <input
                    type="email"
                    {...register("email", {
                      required: "メールアドレスは必須項目です。",
                    })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none text-gray-700"
                  />
                  {errors.email && <p>{errors.email.message}</p>}
                </dd>
              </div>
              <div className="flex flex-col min-h-[85px] md:border-b py-3">
                <dt className="mb-1 text-gray-500 md:text-lg">電話番号</dt>
                <dd className="text-lg font-normal pl-3">
                  <input
                    type="tel"
                    {...register("phoneNumber", {
                      required: "電話番号は必須項目です。",
                    })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none text-gray-700"
                  />
                  {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
                </dd>
              </div>
              <div className="flex flex-col min-h-[85px] md:border-b py-3">
                <dt className="mb-1 text-gray-500 md:text-lg">ステータス</dt>
                <dd className="text-lg font-normal pl-3">
                  <label className="mr-2 text-gray-700">
                    <input
                      type="radio"
                      {...register("status", {
                        required: "ステータスは必須項目です。",
                      })}
                      value="active"
                      className="mr-1 outline-none"
                    />
                    在職中
                  </label>
                  <label className="mr-2 text-gray-700">
                    <input
                      type="radio"
                      {...register("status")}
                      value="inactive"
                      className="mr-1 outline-none"
                    />
                    退職済
                  </label>
                  {errors.status && <p>{errors.status.message}</p>}
                </dd>
              </div>
              <div className="flex flex-col min-h-[85px] md:border-b py-3">
                <dt className="mb-1 text-gray-500 md:text-lg">入社日</dt>
                <dd className="text-lg font-normal pl-3">
                  <input
                    type="date"
                    {...register("joinDate", {
                      required: "入社日は必須項目です。",
                    })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none text-gray-700"
                  />
                </dd>
                {errors.joinDate && <p>{errors.joinDate.message}</p>}
              </div>
            </div>
            <div className="flex flex-col py-3 space-y-3">
              <div className="flex flex-col min-h-[85px] md:border-b py-3">
                <dt className="mb-1 text-gray-500 md:text-lg">退職日</dt>
                <dd className="text-lg font-normal pl-3">
                  <input
                    type="date"
                    {...register("leaveDate")}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none text-gray-700"
                  />
                </dd>
              </div>
              <div className="flex flex-col min-h-[85px] md:border-b py-3">
                <dt className="mb-1 text-gray-500 md:text-lg">役職</dt>
                <dd className="text-lg font-normal pl-3">
                  <select
                    name="positionId"
                    {...register("positionId")}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none text-gray-700"
                  >
                    <option value="">選択してください</option>
                    <option value="1">管理職</option>
                    <option value="2">営業</option>
                    <option value="3">エンジニア</option>
                    <option value="4">事務</option>
                  </select>
                </dd>
              </div>
              <div className="flex flex-col min-h-[85px] md:border-b py-3">
                <dt className="mb-1 text-gray-500 md:text-lg">部署名</dt>
                <dd className="text-lg font-normal pl-3">
                  <select
                    name="departmentId"
                    {...register("departmentId")}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none text-gray-700"
                  >
                    <option value="">選択してください</option>
                    <option value="1">システム部</option>
                    <option value="2">広報部</option>
                    <option value="3">人事部</option>
                    <option value="4">労務部</option>
                    <option value="5">経理部</option>
                  </select>
                </dd>
              </div>
              <div className="flex flex-col min-h-[85px] md:border-b py-3">
                <dt className="mb-1 text-gray-500 md:text-lg">権限</dt>
                <dd className="text-lg font-normal pl-3">
                  <select
                    name="roleId"
                    {...register("roleId")}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none text-gray-700"
                  >
                    <option value="">選択してください</option>
                    <option value="1">全権限</option>
                    <option value="2">閲覧</option>
                    <option value="3">閲覧追加</option>
                    <option value="4">閲覧編集追加</option>
                  </select>
                </dd>
              </div>
            </div>
          </dl>
        </form>
      </div>
    </Layout>
  );
};

export default EmployeeCreate;
