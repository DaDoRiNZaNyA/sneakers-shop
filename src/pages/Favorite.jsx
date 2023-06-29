import Card from '../components/Card';

function Favorite(props) {
  const { items, onFavorite } = props;
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Избранное</h1>
      </div>

      <div className="d-flex flex-wrap">
      {
          items.map((obj) => (
              <Card
                key={obj.title}
                title={obj.title}
                price={obj.price}
                imageUrl={obj.imageUrl}
                favorited={true}
                onFavorite={onFavorite}
                id = {obj.id}
              />
            ))
        }
      </div>
    </div>
  );
}

export default Favorite;
