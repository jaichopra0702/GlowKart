import React,{useState} from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import QuizStart from './Components/QuizStart';
import QuestionPage from './Components/QuestionPage';
import ThankYouPage from "./Components/ThankYouPage";
import Navbar from './Components/Navbar';
import ProductList from './Components/ProductList';
import Cart from './Components/Cart';
import Login from './Components/login';



const products = [
  // Acne Category
  { id: 1, name: 'Acne Treatment Gel', category: 'Acne', price: 1500, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
  { id: 2, name: 'Acne Moisturizer', category: 'Acne', price: 1200, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
  { id: 3, name: 'Blemish Control Serum', category: 'Acne', price: 1700, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
  { id: 4, name: 'Acne Spot Treatment', category: 'Acne', price: 1600, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
  { id: 5, name: 'Acne Cleansing Foam', category: 'Acne', price: 1400, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
  { id: 6, name: 'Acne Control Pads', category: 'Acne', price: 1800, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },

  // Dry Skin Category
  { id: 7, name: 'Hydrating Moisturizer', category: 'DrySkin', price: 1800, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
  { id: 8, name: 'Deep Moisture Balm', category: 'DrySkin', price: 2000, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
  { id: 9, name: 'Nourishing Night Cream', category: 'DrySkin', price: 2200, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
  { id: 10, name: 'Soothing Facial Oil', category: 'DrySkin', price: 2100, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
  { id: 11, name: 'Revitalizing Face Mask', category: 'DrySkin', price: 2300, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
  { id: 12, name: 'Moisturizing Face Mist', category: 'DrySkin', price: 1500, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },

  // Oily Skin Category
  { id: 13, name: 'Oil Control Lotion', category: 'OilySkin', price: 1300, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
  { id: 14, name: 'Oil Control Cleanser', category: 'OilySkin', price: 1400, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
  { id: 15, name: 'Mattifying Moisturizer', category: 'OilySkin', price: 1600, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
  { id: 16, name: 'Pore Minimizing Serum', category: 'OilySkin', price: 1500, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
  { id: 17, name: 'Oil Absorbing Sheets', category: 'OilySkin', price: 1000, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
  { id: 18, name: 'Oil-Free Sunscreen', category: 'OilySkin', price: 1800, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },

  // Pigmentation Category
  { id: 19, name: 'Turmeric Moisturizer', category: 'Pigmentation', price: 1400, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
  { id: 20, name: 'Brightening Serum', category: 'Pigmentation', price: 1800, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
  { id: 21, name: 'Spot Corrector', category: 'Pigmentation', price: 1900, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
  { id: 22, name: 'Pigment Control Cream', category: 'Pigmentation', price: 1600, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
  { id: 23, name: 'Brightening Face Mask', category: 'Pigmentation', price: 1700, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
  { id: 24, name: 'Even Tone Night Cream', category: 'Pigmentation', price: 2000, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },

  // Sensitive Skin Category
  { id: 25, name: 'PLANT REMEDY Skin Elixir 10ml', category: 'SensitiveSkin', price: 1250, imageUrl: 'https://via.placeholder.com/250x250?text=Skin+Elixir' },
  { id: 26, name: 'Exfoliating Cleanser 100ml', category: 'SensitiveSkin', price: 1350, imageUrl: 'https://via.placeholder.com/250x250?text=Cleanser' },
  { id: 27, name: 'HYDRATING CHIA CREAM 30ml', category: 'SensitiveSkin', price: 1250, imageUrl: 'https://via.placeholder.com/250x250?text=Chia+Cream' },
  { id: 28, name: 'Soothing Facial Mist', category: 'SensitiveSkin', price: 1400, imageUrl: 'https://via.placeholder.com/250x250?text=Facial+Mist' },
  { id: 29, name: 'Calming Face Mask', category: 'SensitiveSkin', price: 1500, imageUrl: 'https://via.placeholder.com/250x250?text=Face+Mask' },
  { id: 30, name: 'Sensitive Skin Moisturizer', category: 'SensitiveSkin', price: 1600, imageUrl: 'https://via.placeholder.com/250x250?text=Moisturizer' },

  // Combination Skin Category
{ id: 31, name: 'Acne Treatment Gel', category: 'CombinationSkin', price: 1500, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
{ id: 32, name: 'Acne Moisturizer', category: 'CombinationSkin', price: 1200, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
{ id: 33, name: 'Blemish Control Serum', category: 'CombinationSkin', price: 1700, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
{ id: 34, name: 'Balancing Toner', category: 'CombinationSkin', price: 1400, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
{ id: 35, name: 'Combination Skin Cleanser', category: 'CombinationSkin', price: 1600, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
{ id: 36, name: 'Hydration Balance Cream', category: 'CombinationSkin', price: 1800, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },

// Textured Skin Category
{ id: 37, name: 'Hydrating Moisturizer', category: 'TexturedSkin', price: 1800, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
{ id: 38, name: 'Deep Moisture Balm', category: 'TexturedSkin', price: 2000, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
{ id: 39, name: 'Texture Refining Serum', category: 'TexturedSkin', price: 1900, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
{ id: 40, name: 'Exfoliating Night Cream', category: 'TexturedSkin', price: 2200, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
{ id: 41, name: 'Pore Smoothing Primer', category: 'TexturedSkin', price: 1600, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
{ id: 42, name: 'Smoothing Face Mask', category: 'TexturedSkin', price: 1800, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
];

function App() {

  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const productExists = prevCart.find((item) => item.name === product.name);
      if (productExists) {
        return prevCart.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (product) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.name !== product.name)
    );
  };
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/quiz" element={<QuizStart />} />
    <Route path="/question/:questionNumber" element={<QuestionPage />} />
    <Route path="/thank-you" element={<ThankYouPage />} />
    <Route path="/:category" element={<ProductList products={products} addToCart={addToCart} />} />
    <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />

      </Routes>
    </div>
  );
}

export default App;




// import React, { useState } from 'react';
// import { Route, Routes } from 'react-router-dom';
// import LandingPage from './Components/LandingPage';
// import login from './Components/login';
// import QuizStart from './Components/QuizStart';
// import QuestionPage from './Components/QuestionPage';
// import ThankYouPage from './Components/ThankYouPage';
// import Navbar from './Components/Navbar';
// import ProductList from './Components/ProductList';
// import Cart from './Components/Cart';
// import Signup from './Components/Signup';
// // import './App.css'
// import'./App1.css'

// const products = [
//   // Acne Category
//   { id: 1, name: 'Acne Treatment Gel', category: 'Acne', price: 1500, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
//   { id: 2, name: 'Acne Moisturizer', category: 'Acne', price: 1200, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
//   { id: 3, name: 'Blemish Control Serum', category: 'Acne', price: 1700, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
//   { id: 4, name: 'Acne Spot Treatment', category: 'Acne', price: 1600, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
//   { id: 5, name: 'Acne Cleansing Foam', category: 'Acne', price: 1400, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
//   { id: 6, name: 'Acne Control Pads', category: 'Acne', price: 1800, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },

//   // Dry Skin Category
//   { id: 7, name: 'Hydrating Moisturizer', category: 'DrySkin', price: 1800, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
//   { id: 8, name: 'Deep Moisture Balm', category: 'DrySkin', price: 2000, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
//   { id: 9, name: 'Nourishing Night Cream', category: 'DrySkin', price: 2200, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
//   { id: 10, name: 'Soothing Facial Oil', category: 'DrySkin', price: 2100, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
//   { id: 11, name: 'Revitalizing Face Mask', category: 'DrySkin', price: 2300, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
//   { id: 12, name: 'Moisturizing Face Mist', category: 'DrySkin', price: 1500, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },

//   // Oily Skin Category
//   { id: 13, name: 'Oil Control Lotion', category: 'OilySkin', price: 1300, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
//   { id: 14, name: 'Oil Control Cleanser', category: 'OilySkin', price: 1400, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
//   { id: 15, name: 'Mattifying Moisturizer', category: 'OilySkin', price: 1600, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
//   { id: 16, name: 'Pore Minimizing Serum', category: 'OilySkin', price: 1500, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
//   { id: 17, name: 'Oil Absorbing Sheets', category: 'OilySkin', price: 1000, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
//   { id: 18, name: 'Oil-Free Sunscreen', category: 'OilySkin', price: 1800, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },

//   // Pigmentation Category
//   { id: 19, name: 'Turmeric Moisturizer', category: 'Pigmentation', price: 1400, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
//   { id: 20, name: 'Brightening Serum', category: 'Pigmentation', price: 1800, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
//   { id: 21, name: 'Spot Corrector', category: 'Pigmentation', price: 1900, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
//   { id: 22, name: 'Pigment Control Cream', category: 'Pigmentation', price: 1600, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
//   { id: 23, name: 'Brightening Face Mask', category: 'Pigmentation', price: 1700, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
//   { id: 24, name: 'Even Tone Night Cream', category: 'Pigmentation', price: 2000, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },

//   // Sensitive Skin Category
//   { id: 25, name: 'PLANT REMEDY Skin Elixir 10ml', category: 'SensitiveSkin', price: 1250, imageUrl: 'https://via.placeholder.com/250x250?text=Skin+Elixir' },
//   { id: 26, name: 'Exfoliating Cleanser 100ml', category: 'SensitiveSkin', price: 1350, imageUrl: 'https://via.placeholder.com/250x250?text=Cleanser' },
//   { id: 27, name: 'HYDRATING CHIA CREAM 30ml', category: 'SensitiveSkin', price: 1250, imageUrl: 'https://via.placeholder.com/250x250?text=Chia+Cream' },
//   { id: 28, name: 'Soothing Facial Mist', category: 'SensitiveSkin', price: 1400, imageUrl: 'https://via.placeholder.com/250x250?text=Facial+Mist' },
//   { id: 29, name: 'Calming Face Mask', category: 'SensitiveSkin', price: 1500, imageUrl: 'https://via.placeholder.com/250x250?text=Face+Mask' },
//   { id: 30, name: 'Sensitive Skin Moisturizer', category: 'SensitiveSkin', price: 1600, imageUrl: 'https://via.placeholder.com/250x250?text=Moisturizer' },

//   // Combination Skin Category
// { id: 31, name: 'Acne Treatment Gel', category: 'CombinationSkin', price: 1500, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
// { id: 32, name: 'Acne Moisturizer', category: 'CombinationSkin', price: 1200, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
// { id: 33, name: 'Blemish Control Serum', category: 'CombinationSkin', price: 1700, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
// { id: 34, name: 'Balancing Toner', category: 'CombinationSkin', price: 1400, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
// { id: 35, name: 'Combination Skin Cleanser', category: 'CombinationSkin', price: 1600, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
// { id: 36, name: 'Hydration Balance Cream', category: 'CombinationSkin', price: 1800, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },

// // Textured Skin Category
// { id: 37, name: 'Hydrating Moisturizer', category: 'TexturedSkin', price: 1800, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
// { id: 38, name: 'Deep Moisture Balm', category: 'TexturedSkin', price: 2000, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
// { id: 39, name: 'Texture Refining Serum', category: 'TexturedSkin', price: 1900, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
// { id: 40, name: 'Exfoliating Night Cream', category: 'TexturedSkin', price: 2200, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
// { id: 41, name: 'Pore Smoothing Primer', category: 'TexturedSkin', price: 1600, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
// { id: 42, name: 'Smoothing Face Mask', category: 'TexturedSkin', price: 1800, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
// ];

// const App = () => {
//   const [cart, setCart] = useState([]);

//   const addToCart = (product) => {
//     setCart((prevCart) => {
//       const productExists = prevCart.find((item) => item.name === product.name);
//       if (productExists) {
//         return prevCart.map((item) =>
//           item.name === product.name
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         return [...prevCart, { ...product, quantity: 1 }];
//       }
//     });
//   };

//   const removeFromCart = (product) => {
//     setCart((prevCart) =>
//       prevCart.filter((item) => item.name !== product.name)
//     );
//   };

//   return (
//     <div className="App">
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/login" element={<login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/quiz" element={<QuizStart />} />
//         <Route path="/question/:questionNumber" element={<QuestionPage />} />
//         <Route path="/thank-you" element={<ThankYouPage />} />
//         <Route
//           path="/product"
//           element={<ProductList products={products} addToCart={addToCart} />}
//         />
//         <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
//       </Routes>
//     </div>
//   );
// };

// export default App;
