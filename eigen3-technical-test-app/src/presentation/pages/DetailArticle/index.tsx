import AppLayout from "../../components/AppLayout";
import { Layout, Typography } from "antd";
import "./styles.scss";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getArticleById } from "../../../data/datasources/db/newsDB";
import type { Article } from "../../../domain/entities/Article";
import { formatDateLong } from "../../../app/utils/formatDate";
import Loading from "../../components/Loading";

const { Title, Text, Paragraph } = Typography;

const DetailArticle = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      getArticleById(id)
        .then((data) => {
          setArticle(data || null);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Failed to load article", err);
          setIsLoading(false);
        });
    }
  }, [id]);

  if (isLoading) return <Loading />;

  if (!article) {
    return (
      <AppLayout>
        <p>Article not found</p>
      </AppLayout>
    );
  }

  const { urlToImage, title, description, publishedAt, author, sourceName } =
    article;

  return (
    <AppLayout>
      <Layout className="detail-article">
        <div className="image-wrapper">
          <img
            src={urlToImage}
            alt="Article Visual"
            data-testid="article-image"
          />
        </div>

        <div className="content-wrapper">
          <Title className="detail-article-title" data-testid="article-title">
            {title}
          </Title>
          <Text className="detail-article-date" data-testid="article-meta">
            By {author} · {sourceName} · Published on{" "}
            {formatDateLong(publishedAt)}
          </Text>
          <Paragraph
            className="detail-article-content"
            data-testid="article-description"
          >
            {description}
          </Paragraph>
        </div>
      </Layout>
    </AppLayout>
  );
};

export default DetailArticle;
