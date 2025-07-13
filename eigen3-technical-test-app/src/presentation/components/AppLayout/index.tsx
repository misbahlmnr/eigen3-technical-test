import { Layout } from "antd";
import Navbar from "../Navbar";
import "./styles.scss";
import Footer from "../Footer";

type Props = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: Props) => {
  return (
    <Layout className="app-layout">
      <Navbar />
      <Layout className="content">{children}</Layout>
      <Footer />
    </Layout>
  );
};

export default AppLayout;
