import { Typography } from "antd";
import "./styles.scss";

const { Text } = Typography;

const Footer = () => {
  return (
    <footer className="footer">
      <Text>Copyright © {new Date().getFullYear()} All rights reserved</Text>
    </footer>
  );
};

export default Footer;
