import { Route, Routes } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import Home from './pages/Home';
import Header from './components/Header';
import Drawer from './components/Drawer';
import axios from 'axios';
import Favorite from './pages/Favorite';

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartOpened, setCartOpened] = useState(false); // исправлено имя состояния

  useEffect(() => {
    axios.get('https://649a7e73bf7c145d0238e7ab.mockapi.io/items').then(res => {
      setItems(res.data);
    })
    axios.get('https://649a7e73bf7c145d0238e7ab.mockapi.io/cart').then(res => {
      setCartItems(res.data);
    })
  }, []);

  const onAdToCart = (obj) => {
    if (cartItems.find((favObj) => favObj.id === obj.id)){
      axios.delete(`https://649a7e73bf7c145d0238e7ab.mockapi.io/cart/${obj.id}`);
      setCartItems((prev) => prev.filter((item) => item.id !== obj.id));
    }else{
      axios.post('https://649a7e73bf7c145d0238e7ab.mockapi.io/cart', obj);
      setCartItems(prev => [...prev,obj]);
    }
    
  };

  const onFavorite = (obj) => {
    if (favorites.find((favObj) => favObj.id === obj.id)){
      setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
    }else{
      const updatedFavorites = [...favorites, obj];
      setFavorites(updatedFavorites);
    }
   
  };
  

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);  
  };

  const deleteItem = (id) => {
    axios.delete(`https://649a7e73bf7c145d0238e7ab.mockapi.io/cart/${id}`);
    setCartItems((prev) => [...prev.filter(item => item.id !== id)]);
  }

  return (
    <div className="wrapper clear">
      {cartOpened ? <Drawer clickOnDeleteItem={deleteItem} items={cartItems} onClickCart={() => setCartOpened(!cartOpened)} /> : null}
      <Header onClickCart={() => setCartOpened(!cartOpened)} />
      <Routes>
        <Route path="/" element={<Home items={items} searchValue={searchValue} onChangeSearchInput={onChangeSearchInput} onFavorite={onFavorite} onAdToCart={onAdToCart} />} />
        <Route path="/favorites" element={<Favorite items={favorites} onFavorite={onFavorite}/>} />
      </Routes>
    </div>
  );
}

export default App;
