import { Card as AntCard } from "antd";
import "./styles.scss";
import { Link } from "react-router-dom";
import image404 from "../../../assets/img-404.png";
import type { Article } from "../../../domain/entities/Article";
import { generateArticleId } from "../../../app/utils/articleHelpers";

const { Meta } = AntCard;

const Card = ({ article }: { article: Article }) => {
  return (
    <Link to={`/article/${generateArticleId(article)}`}>
      <AntCard
        className="card"
        cover={
          <img
            src={article.urlToImage}
            alt=""
            loading="lazy"
            onError={(e) => (e.currentTarget.src = image404)}
          />
        }
      >
        <Meta title={article.title} description={article.sourceName}></Meta>
      </AntCard>
    </Link>
  );
};

export default Card;
