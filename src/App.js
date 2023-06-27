import { useContext, useState, useEffect } from 'react';
import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';

function App() {
  const [items, setItems] = useState([]);
  const [cartOpened, setcartOpened] = useState(false);

  useEffect(() => {
    fetch('https://649a7e73bf7c145d0238e7ab.mockapi.io/items').then(res => {
      return res.json();
    }).then((json) => {
      setItems(json);
    });
  }, []);

  return (
    <div className="wrapper clear">
      {cartOpened ? <Drawer onClickCart={() => setcartOpened(!cartOpened)} />: null}
      <Header onClickCart={() => setcartOpened(!cartOpened)}/>
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Поиск..." />
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {
            items.map((obj) => (
              <Card 
              title={obj.title} 
              price={obj.price} 
              imageUrl={obj.imageUrl}
              onClickFavorite={() => console.log('favorite')}
              onClickPlus={() => console.log('plus')}/>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
