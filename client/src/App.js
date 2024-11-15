import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import QuizStart from './Components/QuizStart';
import QuestionPage from './Components/QuestionPage';
import ThankYouPage from "./Components/ThankYouPage";
import Navbar from './Components/Navbar';
import ProductList from './Components/ProductList';
import Cart from './Components/Cart';
import Login from './Components/login';
import { CartContext } from "./Components/CartContext";
import Recommendations from "./Components/Recommendations";




const products = [
  // Acne Category
  { id: 1, name: 'Acne Treatment Gel', category: 'Acne', price: 1500, imageUrl: 'https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w:1080/1090912/C-iRhDQGuO-4103040895554_1.jpg' },
  { id: 2, name: 'Acne Moisturizer', category: 'Acne', price: 1200, imageUrl: 'https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w:1080/1127303/k9WJ3RrB4B-1127303_2.jpg' },
  { id: 3, name: 'Blemish Control Serum', category: 'Acne', price: 1700, imageUrl: 'https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w:1080/1088060/m2K-vZNrDa-8901030902017_2.jpg' },
  { id: 4, name: 'Acne Spot Treatment', category: 'Acne', price: 1600, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
  { id: 5, name: 'Acne Cleansing Foam', category: 'Acne', price: 1400, imageUrl: 'https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w:1080/the-derma-co/COMBO_231205115118-WW1/1/VpavZ22-iG-1083452_Combo_49-2.jpg' },
  { id: 6, name: 'Acne control Sunscreen', category: 'Acne', price: 1800, imageUrl: 'https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w:1080/917049/vl_HhGZ_9-917049_1.jpg' },

  // Dry Skin Category
  { id: 7, name: 'Hydrating Moisturizer', category: 'DrySkin', price: 1800, imageUrl: 'https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w:1080/1090175/1dJAZaaN0F-1090175_3.jpg' },
  { id: 8, name: 'Deep Moisture Balm', category: 'DrySkin', price: 2000, imageUrl: 'https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w:1080/1116011/e1NCfiCDZQ-8906060214482_1.jpg' },
  { id: 9, name: 'Nourishing Night Cream', category: 'DrySkin', price: 2200, imageUrl: 'https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w:1080/1080531/5n334TDqhe-8901725995225_1.jpg' },
  { id: 10, name: 'Soothing Facial Oil', category: 'DrySkin', price: 2100, imageUrl: 'https://www.bing.com/th?id=OPAC.gJVtKjwzeI1gCw474C474&o=5&pid=21.1&w=124&h=146&rs=1&qlt=100&dpr=1.5&bw=6&bc=FFFFFF' },
  { id: 11, name: 'Revitalizing Face Mask', category: 'DrySkin', price: 2300, imageUrl: 'https://www.bing.com/th?id=OPAC.4j%2f2TOpno7cogQ474C474&o=5&pid=21.1&w=136&h=136&rs=1&qlt=100&dpr=1.5&pcl=f5f5f5' },
  { id: 12, name: 'Moisturizing Sunscreen', category: 'DrySkin', price: 1500, imageUrl: 'https://www.bing.com/th?id=OIP.KcvpOLNfCWqElkgpZhAb2gHaHa&w=150&h=150&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2' },

  // Oily Skin Category
  { id: 13, name: 'Oil Control Lotion', category: 'OilySkin', price: 1300, imageUrl: 'https://th.bing.com/th/id/OIP.1MQTqXQRNrmWzj5g6VgCAQHaHa?w=215&h=215&c=7&r=0&o=5&dpr=1.5&pid=1.7' },
  { id: 14, name: 'Oil Control Cleanser', category: 'OilySkin', price: 1400, imageUrl: 'https://www.bing.com/th?id=OPAC.hFGeWPZop%2bQPNQ474C474&o=5&pid=21.1&w=136&h=158&rs=1&qlt=100&dpr=1.5&pcl=f5f5f5' },
  { id: 15, name: 'Mattifying Moisturizer', category: 'OilySkin', price: 1600, imageUrl: 'https://th.bing.com/th?id=OPAC.%2bl5TnHUrU762Sw474C474&w=200&h=220&c=17&dpr=1.5&pid=21.1' },
  { id: 16, name: 'Pore Minimizing Serum', category: 'OilySkin', price: 1500, imageUrl: 'https://th.bing.com/th?id=OPAC.jwkHCZgq5wTGTw474C474&w=160&h=220&c=17&dpr=1.5&pid=21.1' },
  { id: 17, name: 'Oil Absorbing Sheets', category: 'OilySkin', price: 1000, imageUrl: 'https://th.bing.com/th?id=OPAC.Gr5jZumF6gPnJA474C474&w=220&h=220&c=17&o=5&dpr=1.5&pid=21.1' },
  { id: 18, name: 'Oil-Free Sunscreen', category: 'OilySkin', price: 1800, imageUrl: 'https://th.bing.com/th?id=OPAC.6LAyHUEw9KZc2g474C474&w=160&h=220&c=17&dpr=1.5&pid=21.1' },

  // Pigmentation Category
  { id: 19, name: 'Tinted Sunscreen', category: 'Pigmentation', price: 1400, imageUrl: 'https://www.bing.com/th?id=OPAC.mwnVpYTTc5Apkg474C474&o=5&pid=21.1&w=160&h=226&rs=1&qlt=100&dpr=1.5&c=8&pcl=f5f5f5' },
  { id: 20, name: 'Brightening Serum', category: 'Pigmentation', price: 1800, imageUrl: 'https://www.bing.com/th?id=OPAC.3W4JQ%2fMHq2Nv4g474C474&o=5&pid=21.1&w=160&h=185&rs=1&qlt=100&dpr=1.5&c=8&pcl=f5f5f5' },
  { id: 21, name: 'Spot Corrector', category: 'Pigmentation', price: 1900, imageUrl: 'https://th.bing.com/th?id=OPAC.pyrjzrfAVNrHSQ474C474&w=128&h=168&rs=1&pcl=f5f5f5&o=6&dpr=1.5&pid=21.1' },
  { id: 22, name: 'Pigment Control Cream', category: 'Pigmentation', price: 1600, imageUrl: 'https://th.bing.com/th?id=OPAC.5PpSX3BBDVCgYA474C474&w=128&h=128&rs=1&pcl=f5f5f5&o=6&dpr=1.5&pid=21.1' },
  { id: 23, name: 'Brightening Face Mask', category: 'Pigmentation', price: 1700, imageUrl: 'https://th.bing.com/th?id=OPAC.myy9kotU%2fnUMQg474C474&w=220&h=220&c=17&o=5&dpr=1.5&pid=21.1'},
  { id: 24, name: 'Even Tone Night Cream', category: 'Pigmentation', price: 2000, imageUrl: 'https://th.bing.com/th?id=OPAC.q8moSpimmtYo2w474C474&w=171&h=150&c=17&dpr=1.5&pid=21.1' },

  // Sensitive Skin Category
  { id: 25, name: 'PLANT REMEDY Skin Elixir 10ml', category: 'SensitiveSkin', price: 1250, imageUrl: 'https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/original/1119782/8f1zEzbKN_-1119782_5.jpg?dpr=2' },
  { id: 26, name: 'Exfoliating Cleanser 100ml', category: 'SensitiveSkin', price: 1350, imageUrl: 'https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/original/1053568/iKfjoFBIZX-1053568_3.jpg?dpr=2' },
  { id: 27, name: 'HYDRATING CHIA CREAM 30ml', category: 'SensitiveSkin', price: 1250, imageUrl: 'https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w:1080/1140048/_iSwl6ApWG-1140048-1.jpg' },
  { id: 28, name: 'Soothing Facial Mist', category: 'SensitiveSkin', price: 1400, imageUrl: 'https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w:1080/1132344/zHuqxeH926-1132344-2.jpg' },
  { id: 29, name: 'Calming Face Mask', category: 'SensitiveSkin', price: 1500, imageUrl: 'https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w:1080/1122544/zUoUgTKSm3-1122544_1.jpg' },
  { id: 30, name: 'Sensitive Skin Sunscreen', category: 'SensitiveSkin', price: 1600, imageUrl: 'https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w:1080/1108204/ZUTz_Idifb-1108204_2.jpg' },

  // Combination Skin Category
{ id: 31, name: 'Acne Treatment Gel', category: 'CombinationSkin', price: 1500, imageUrl: 'https://th.bing.com/th?id=OPAC.WKOL%2bbHQqCv2rQ474C474&w=160&h=220&c=17&dpr=1.5&pid=21.1' },
{ id: 32, name: 'Acne Moisturizer', category: 'CombinationSkin', price: 1200, imageUrl: 'https://th.bing.com/th?id=OPAC.rQuUGZisl66pQQ474C474&w=200&h=220&c=17&dpr=1.5&pid=21.1' },
{ id: 33, name: 'Blemish Control Serum', category: 'CombinationSkin', price: 1700, imageUrl: 'https://th.bing.com/th?id=OPAC.9vhgeGS1vt2ZbA474C474&w=160&h=220&c=17&dpr=1.5&pid=21.1' },
{ id: 34, name: 'Balancing Toner', category: 'CombinationSkin', price: 1400, imageUrl: 'https://th.bing.com/th?id=OPAC.usJdT6SufQwbkw474C474&w=220&h=210&c=17&o=5&dpr=1.5&pid=21.1' },
{ id: 35, name: 'Combination Skin Cleanser', category: 'CombinationSkin', price: 1600, imageUrl: 'https://th.bing.com/th?id=OPAC.zg66jsQsR%2b9Rog474C474&w=196&h=220&c=17&dpr=1.5&pid=21.1' },
{ id: 36, name: 'Hydration Balance Sunscreen', category: 'CombinationSkin', price: 1800, imageUrl: 'https://th.bing.com/th?id=OPAC.UfK%2fxHNRTCN3YA474C474&w=160&h=220&c=17&dpr=1.5&pid=21.1' },

// Textured Skin Category
{ id: 37, name: 'Hydrating Moisturizer', category: 'TexturedSkin', price: 1800, imageUrl: 'https://th.bing.com/th?id=OPAC.qQao%2b5Gofr%2bKuA474C474&w=160&h=220&c=17&dpr=1.5&pid=21.1' },
{ id: 38, name: 'Deep Moisture Sunscreen', category: 'TexturedSkin', price: 2000, imageUrl: 'https://th.bing.com/th?id=OPAC.OHa%2f6IaYy%2fdgoA474C474&w=160&h=220&c=17&dpr=1.5&pid=21.1' },
{ id: 39, name: 'Texture Refining Serum', category: 'TexturedSkin', price: 1900, imageUrl: 'https://th.bing.com/th?id=OPAC.MRAJrspScaJV6A474C474&w=200&h=220&c=17&dpr=1.5&pid=21.1' },
{ id: 40, name: 'Exfoliating Night Cream', category: 'TexturedSkin', price: 2200, imageUrl: 'https://th.bing.com/th?id=OPAC.z%2f4YLYOtXVnjUQ474C474&w=169&h=150&c=17&dpr=1.5&pid=21.1' },
{ id: 41, name: 'Pore Smoothing Primer', category: 'TexturedSkin', price: 1600, imageUrl: 'https://th.bing.com/th?id=OPAC.Du0UzEpcrt0BtA474C474&w=200&h=220&c=17&dpr=1.5&pid=21.1' },
{ id: 42, name: 'Smoothing Face Mask', category: 'TexturedSkin', price: 1800, imageUrl: 'https://th.bing.com/th?id=OPAC.iUg8tDjCIFTnuQ474C474&w=200&h=220&c=17&dpr=1.5&pid=21.1' },
];

function App() {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever the cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex((cartItem) => cartItem.id === item.id);
      if (itemIndex > -1) {
        const newCart = [...prevCart];
        newCart[itemIndex].quantity += 1;
        return newCart;
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemToRemove) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemToRemove.id));
  };

  const updateCartItemQuantity = (item, newQuantity) => {
    if (newQuantity < 1) return; // Prevent quantity from going below 1
    setCart((prevCart) => {
      return prevCart.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, quantity: newQuantity } : cartItem
      );
    });
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quiz" element={<QuizStart />} />
        <Route path="/question/:questionNumber" element={<QuestionPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/all" element={<ProductList products={products} />} />
        <Route path="/:category" element={<ProductList products={products} />} />
        
        {/* Pass addToCart prop to Recommendations */}
        <Route
          path="/recommendation"
          element={<Recommendations addToCart={addToCart} />}
        />
  
  <Route path="/cart" element={<Cart
          cart={cart}
          removeFromCart={removeFromCart}
          updateCartItemQuantity={updateCartItemQuantity}
        />} />
      </Routes>
    </div>
  );
  
}

export default App;