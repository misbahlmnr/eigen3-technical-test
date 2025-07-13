import { Typography, Row, Col, Spin, Empty } from "antd";
import { useSearchParams } from "react-router-dom";
import { useSearchArticles } from "../../../app/hooks/useSearchArticles";
import AppLayout from "../../components/AppLayout";
import Card from "../../components/Card";

const { Title } = Typography;

const SearchPage = () => {
  const [params] = useSearchParams();
  const keyword = params.get("q") || "";

  const { data, isLoading } = useSearchArticles(keyword);

  return (
    <AppLayout>
      <section>
        <Title level={2} data-testid="search-title">
          Search results for: "{keyword}"
        </Title>

        {isLoading ? (
          <Spin data-testid="loading-spinner" />
        ) : data && data.length > 0 ? (
          <Row gutter={[30, 30]} data-testid="search-results">
            {data.map((article, idx) => (
              <Col key={idx} xs={24} sm={12} md={8} lg={6} xl={4.5}>
                <Card article={article} />
              </Col>
            ))}
          </Row>
        ) : (
          <Empty data-testid="empty-state" description="No articles found" />
        )}
      </section>
    </AppLayout>
  );
};

export default SearchPage;
