import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';

const arr = [
  {title: 'мужские кроссовки .....', price: 12999, imageUrl: "/img/sneakers/1.jpg"},
  {title: 'мужские кроссовки 2.....', price: 15999, imageUrl: "/img/sneakers/2.jpg"},
  {title: 'мужские кроссовки .....', price: 12999, imageUrl: "/img/sneakers/3.jpg"},
  {title: 'мужские кроссовки 2.....', price: 15999, imageUrl: "/img/sneakers/4.jpg"},
];

function App() {
  return (
    <div className="wrapper clear">
      <Drawer />
      <Header />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Поиск..." />
          </div>
        </div>

        <div className="d-flex">
          {
            arr.map((obj) => (
              <Card title={obj.title} price={obj.price} imageUrl={obj.imageUrl}/>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
