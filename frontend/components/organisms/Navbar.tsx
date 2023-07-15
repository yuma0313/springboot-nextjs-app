import Link from "next/link";

const Navbar = () => {
  return (
    <header className="bg-white h-16">
      <div className="px-5 py-3 md:px-10">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex items-center justify-between">
            <Link
              href="/employees"
              className="text-white bg-teal-500 p-2 font-bold rounded-sm cursor-pointer"
            >
              従業員管理システム
            </Link>
            <nav>
              <ul className="flex items-center gap-x-4 text-new-sm font-bold">
                <li>
                  <a href="/employees/create">
                    <span className="hover-normal inline-block px-2 py-1 md:px-3 md:py-2">
                      従業員登録
                    </span>
                  </a>
                </li>
              </ul>
            </nav>
            <div className="flex items-center gap-x-5">
              {/* <div className="rounded-md bg-new-blue-600 text-new-sm font-bold text-new-white">
                <a href="/dashboard/settings">
                  <span className="hover-normal inline-block px-2 py-1 md:px-3 md:py-2">
                    マイページ
                  </span>
                </a>
              </div> */}
              <div className="rounded-md border-2 border-new-blue-600 bg-new-white text-new-sm font-bold text-new-blue-600">
                <button>
                  <span className="hover-normal inline-block px-2 py-1 md:px-3 md:py-2">
                    ログアウト
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
