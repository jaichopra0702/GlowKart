// import React from 'react';
// import { useNavigate, useParams } from 'react-router-dom';

// const Filter = ({ setCategory }) => {
//   const { category } = useParams();
//   const navigate = useNavigate();

//   // Convert URL category to display format for dropdown
//   const getDropdownValue = () => {
//     if (category) {
//       return category.replace(/_/g, ' ').replace(/&/g, ' & '); // Transform underscores back to spaces and replace "&" for better display
//     }
//     return '';
//   };

//   const handleCategoryChange = (e) => {
//     const selectedCategory = e.target.value;
//     const formattedCategory = selectedCategory.replace(/\s+/g, '_'); // Replace spaces with underscores
//     setCategory(selectedCategory);
//     if (formattedCategory) {
//       navigate(`/${formattedCategory}`);
//     } else {
//       navigate('/');
//     }
//   };

//   const styles = {
//     filterContainer: {
//       margin: '20px',
//     },
//     select: {
//       display: 'block', // Always display dropdown
//       padding: '10px',
//       borderRadius: '5px',
//       border: '1px solid #ddd',
//       fontSize: '16px',
//     },
//   };

//   return (
//     <div style={styles.filterContainer}>
//       <select
//         style={styles.select}
//         onChange={handleCategoryChange}
//         value={getDropdownValue()}
//       >
//         <option value="">All Categories</option>
//         <option value="SensitiveSkin">Sensitive Skin</option>
//         <option value="Acne">Acne & Blemishes</option>
//         <option value="DrySkin">Dry Skin</option>
//         <option value="OilySkin">Oily Skin</option>
//         <option value="TexturedSkin">Textured Skin</option>
//         <option value="Pigmentation">Pigmentation</option>
//         <option value="CombinationSkin">Combination Skin</option>
//       </select>
//     </div>
//   );
// };

// export default Filter;

import React from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

const Filter = ({ setCategory }) => {
  const { category } = useParams();
  const navigate = useNavigate();

  const getDropdownValue = () => {
    if (category) {
      return category.replace(/_/g, ' ').replace(/&/g, ' & '); 
    }
    return '';
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    const formattedCategory = selectedCategory.replace(/\s+/g, '_');
    setCategory(selectedCategory);
    if (formattedCategory) {
      navigate(`/${formattedCategory}`);
    } else {
      navigate('/');
    }
  };

  const styles = {
    filterContainer: {
      margin: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    select: {
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ddd',
      fontSize: '16px',
    },
    cartButton: {
      padding: '10px 20px',
      backgroundColor: '#007BFF',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    cartButtonHover: {
      backgroundColor: '#0056b3',
    },
  };

  return (
    <div style={styles.filterContainer}>
      <select
        style={styles.select}
        onChange={handleCategoryChange}
        value={getDropdownValue()}
      >
        <option value="">Select your Skin type</option>
        <option value="SensitiveSkin">Sensitive Skin</option>
        <option value="Acne">Acne & Blemishes</option>
        <option value="DrySkin">Dry Skin</option>
        <option value="OilySkin">Oily Skin</option>
        <option value="TexturedSkin">Textured Skin</option>
        <option value="Pigmentation">Pigmentation</option>
        <option value="CombinationSkin">Combination Skin</option>
      </select>
      <Link to="/cart">
        <button
          style={styles.cartButton}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = styles.cartButtonHover.backgroundColor}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = styles.cartButton.backgroundColor}
        >
          Cart
        </button>
      </Link>
    </div>
  );
};

export default Filter;
