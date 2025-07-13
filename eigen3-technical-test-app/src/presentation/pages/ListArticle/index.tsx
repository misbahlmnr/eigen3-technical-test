import AppLayout from "../../components/AppLayout";
import Card from "../../components/Card";
import { Typography, Row, Col, Button } from "antd";
import "./styles.scss";
import { useParams } from "react-router-dom";
import { useInfiniteTopHeadlines } from "../../../app/hooks/useInfiniteTopHeadlines";
import Loading from "../../components/Loading";

const { Title, Text } = Typography;

const CATEGORY_MAP: Record<string, string> = {
  business: "Business",
  entertainment: "Entertainment",
  health: "Health",
  science: "Science",
  sports: "Sports",
  technology: "Technology",
  "top-stories": "Top Stories",
};

const ListArticle = () => {
  const { category: rawCategory } = useParams();
  const isTopStories = rawCategory === "top-stories" || !rawCategory;
  const category = isTopStories ? undefined : rawCategory;

  const title = CATEGORY_MAP[rawCategory ?? "top-stories"] || "Top Stories";

  const pageSize = 12;

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteTopHeadlines(category, pageSize);

  const articles = data?.pages.flat() ?? [];

  if (isLoading) return <Loading />;

  return (
    <AppLayout>
      <section>
        <Title level={2}>{title}</Title>

        <Row gutter={[30, 30]}>
          {articles.length > 0 ? (
            articles.map((article, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={6} xl={4.5}>
                <Card article={article} />
              </Col>
            ))
          ) : (
            <Text>No articles found</Text>
          )}
        </Row>

        {hasNextPage && (
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <Button
              color="cyan"
              variant="outlined"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? "Loading..." : "Load More"}
            </Button>
          </div>
        )}
      </section>
    </AppLayout>
  );
};

export default ListArticle;
