import AppLayout from "../../components/AppLayout";
import { Typography } from "antd";
import "./styles.scss";
import ArticleSection from "../../components/ArticleSection";

const { Title, Paragraph } = Typography;

const Home = () => {
  return (
    <AppLayout>
      <section className="hero">
        <Title className="hero-title">Stay Informed. Stay Ahead.</Title>
        <Paragraph className="hero-subtitle">
          Get the latest headlines from around the world — fast, reliable, and
          in one place.
        </Paragraph>
      </section>

      <ArticleSection
        title="Top Stories"
        category=""
        to="/category/top-stories"
      />
      <ArticleSection
        title="Business"
        category="business"
        to="/category/business"
      />
      <ArticleSection
        title="Technology"
        category="technology"
        to="/category/technology"
      />
      <ArticleSection title="Sports" category="sports" to="/category/sports" />
      <ArticleSection
        title="Entertainments"
        category="entertainment"
        to="/category/entertainment"
      />
    </AppLayout>
  );
};

export default Home;
