import Head from "next/head";
import Navbar from "./Navbar";

type LayoutProps = {
  //ReactNodeはreactの要素(JSX)を表し、コンポーネントが子要素を受け取ることを表す
  children: React.ReactNode;
  title: string;
};

const Layout: React.FC<LayoutProps> = ({
  children,
  title = "Default title",
}) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
