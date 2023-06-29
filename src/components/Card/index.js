import { useState } from 'react';
import styles from './Card.module.scss';

function Card(props) {
  const {title, imageUrl, price, onFavorite, onClickPlus, favorited=false, id} = props;
  const [isAdded, setIsAdded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(favorited);

  const onPlus = (() => { 
    onClickPlus({title, imageUrl, price});
    setIsAdded(!isAdded);
  });

  const onClickFavorite = (() => {
    onFavorite({ title, imageUrl, price, id });
    setIsFavorite(!isFavorite);
  });
  

  return (
    <div className={styles.card}>
      <div className={styles.favorite}>
        <img onClick={onClickFavorite} src={isFavorite ? "/img/heart-liked.svg" :"/img/heart-unliked.svg"} alt="Unliked" />
      </div>
      <img width={133} height={112} src={imageUrl} alt="Sneakers" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{price}</b>
        </div>
        <img className={styles.plus} onClick={onPlus} src={isAdded  ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} alt="Plus" />
      </div>
    </div>
  );
}

export default Card;
