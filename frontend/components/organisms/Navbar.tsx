import Link from "next/link";

const Navbar = () => {
  return (
    <div className="bg-white">
      <div className="h-16 px-8 flex items-center">
        <Link
          href="/employees"
          className="text-white bg-teal-500 p-2 font-bold rounded-sm cursor-pointer"
        >
          従業員管理システム
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
