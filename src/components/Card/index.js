import ContentLoader from "react-content-loader";
import { useState, useContext } from 'react';
import AppContext from "../../context";
import styles from './Card.module.scss';

function Card(props) {
  const { title, imageUrl, price, onFavorite, onClickPlus, favorited = false, id, isLoading} = props;
  const [isFavorite, setIsFavorite] = useState(favorited);
  const { isItemAdded, setIsItemAdded } = useContext(AppContext);


  const onPlus = () => {
    onClickPlus({ title, imageUrl, price });
  };

  const onClickFavorite = () => {
    onFavorite({ title, imageUrl, price, id });
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      <div className={styles.favorite}>
        <img onClick={onClickFavorite} src={isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"} alt="Unliked" />
      </div>
      {isLoading ? (
        <ContentLoader
          speed={2}
          width={155}
          height={265}
          viewBox="0 0 155 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          {...props}
        >
          <rect x="0" y="0" rx="10" ry="10" width="150" height="90" />
          <rect x="0" y="104" rx="5" ry="5" width="150" height="15" />
          <rect x="0" y="127" rx="5" ry="5" width="100" height="15" />
          <rect x="0" y="149" rx="5" ry="5" width="100" height="15" />
          <rect x="109" y="129" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          <img width={133} height={112} src={imageUrl} alt="Sneakers" />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price}</b>
            </div>
            <img className={styles.plus} onClick={onPlus} src={isItemAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} alt="Plus" />
          </div>
        </>
      )}
    </div>
  );
}
export default Card;