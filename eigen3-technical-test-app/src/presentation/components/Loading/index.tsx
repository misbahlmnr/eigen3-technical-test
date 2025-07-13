import { Flex, Spin } from "antd";
import "./styles.scss";

const Loading = () => {
  return (
    <Flex className="loading" justify="center" align="center" gap={8}>
      <Spin /> Loading...
    </Flex>
  );
};

export default Loading;
