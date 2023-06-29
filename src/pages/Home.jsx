import Card from '../components/Card';

function Home(props) {
  const { items, searchValue, onChangeSearchInput, onFavorite, onAdToCart } = props;

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>{searchValue ? `Поиск по запросу: ${searchValue}` : "Все кроссовки"}</h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="Search" />
          <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..." />
        </div>
      </div>

      <div className="d-flex flex-wrap">
        {
          items
            .filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
            .map((obj) => (
              <Card
                key={obj.title}
                title={obj.title}
                price={obj.price}
                imageUrl={obj.imageUrl}
                onFavorite={(item) => onFavorite(obj)}
                onClickPlus={(item) => onAdToCart(obj)}
                id = {obj.id}
              />
            ))
        }
      </div>
    </div>
  );
}

export default Home;
