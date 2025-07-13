import { Flex, Typography, Row, Col, Spin } from "antd";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import Card from "../Card";
import { useTopHeadlines } from "../../../app/hooks/useTopHeadlines";

const { Title, Text } = Typography;

type ArticleSectionProps = {
  title: string;
  category: string;
  to: string;
};

const ArticleSection = ({ title, category, to }: ArticleSectionProps) => {
  const { data, isLoading } = useTopHeadlines(category, 4);

  if (isLoading)
    return (
      <Flex justify="center" align="center" gap={8} role="status">
        <Spin />
        Loading...
      </Flex>
    );

  return (
    <section className="article-section">
      <Flex justify="space-between" align="center" className="section-header">
        <Title level={3}>{title}</Title>
        {data && data.length > 0 && (
          <Link
            to={to}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            See all <MoveRight size={16} />
          </Link>
        )}
      </Flex>

      <Row gutter={[24, 24]}>
        {data && data?.length > 0 ? (
          data.map((news, i) => (
            <Col key={i} xs={24} sm={12} md={8} lg={6} xl={4.5}>
              <Card article={news} />
            </Col>
          ))
        ) : (
          <Text>No articles found</Text>
        )}
      </Row>
    </section>
  );
};

export default ArticleSection;
