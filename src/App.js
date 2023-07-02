import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Header from './components/Header';
import Drawer from './components/Drawer';
import axios from 'axios';
import Favorite from './pages/Favorite';
import AppContext from './context';

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [cartOpened, setCartOpened] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const cartResponse = await axios.get('https://649a7e73bf7c145d0238e7ab.mockapi.io/cart');
      const itemsResponse = await axios.get('https://649a7e73bf7c145d0238e7ab.mockapi.io/items');
      setCartItems(cartResponse.data);
      setItems(itemsResponse.data);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const onAdToCart = async (obj) => {
    if (cartItems.find((favObj) => favObj.id === obj.id)) {
      try {
        setCartItems((prev) => prev.filter((item) => item.id !== obj.id));
        const response = await axios.get('https://649a7e73bf7c145d0238e7ab.mockapi.io/cart');
        const mockItems = response.data;
        const mockId = mockItems.find(product => product.id === obj.id.toString());
        await axios.delete(`https://649a7e73bf7c145d0238e7ab.mockapi.io/cart/${mockId.mockId}`);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        setCartItems((prev) => [...prev, obj]);
        await axios.post('https://649a7e73bf7c145d0238e7ab.mockapi.io/cart', obj);
      } catch (error) {
        console.error(error);
      }
    }
  };
  
  

  const onFavorite = (obj) => {
    if (favorites.find((favObj) => favObj.id === obj.id)) {
      setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
    } else {
      const updatedFavorites = [...favorites, obj];
      setFavorites(updatedFavorites);
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };
  
  const deleteItem = async (id) => {
    try {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
      const response = await axios.get('https://649a7e73bf7c145d0238e7ab.mockapi.io/cart');
      const mockItems = response.data;
      const mockId = mockItems.find(product => product.id === id.toString());
      await axios.delete(`https://649a7e73bf7c145d0238e7ab.mockapi.io/cart/${mockId.mockId}`);
    } catch (error) {
      console.error(error);
    }
  };
  

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        cartItems,
        setCartItems,
        favorites,
        items,
        isItemAdded,
        setCartOpened,
      }}
    >
      <div className="wrapper clear">
        {cartOpened ? (
          <Drawer onRemove={deleteItem} items={cartItems} onClickCart={() => setCartOpened(!cartOpened)} onClose={() => setCartOpened(!cartOpened)} />
        ) : null}
        <Header onClickCart={() => setCartOpened(!cartOpened)} />
        <Routes>
          <Route
            path="/"
            element={<Home items={items} searchValue={searchValue} onChangeSearchInput={onChangeSearchInput} onFavorite={onFavorite} onAdToCart={onAdToCart} isLoading={isLoading} />}
          />
          <Route path="/favorites" element={<Favorite items={favorites} onFavorite={onFavorite} />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
