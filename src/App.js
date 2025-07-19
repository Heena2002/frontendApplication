import React, { useState, useEffect } from 'react';

const mockProducts = [
  { id: 1, name: "iPhone 13", category: "electronics", brand: "Apple", price: 900 },
  { id: 2, name: "Galaxy S22", category: "electronics", brand: "Samsung", price: 800 },
  { id: 3, name: "Denim Jacket", category: "fashion", brand: "Levis", price: 120 },
  { id: 4, name: "Blender", category: "home", brand: "Philips", price: 90 },
  { id: 5, name: "T-shirt", category: "fashion", brand: "Zara", price: 50 },
  { id: 6, name: "Laptop", category: "electronics", brand: "Dell", price: 1000 }
];

const categories = ["electronics", "fashion", "home"];
const brands = ["Apple", "Samsung", "Levis", "Philips", "Zara", "Dell"];

function ProductCatalog() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);

  useEffect(() => {
    let result = [...mockProducts];

    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brand));
    }

    if (minPrice) {
      result = result.filter(p => p.price >= parseFloat(minPrice));
    }

    if (maxPrice) {
      result = result.filter(p => p.price <= parseFloat(maxPrice));
    }

    setFilteredProducts(result);
  }, [selectedCategory, selectedBrands, minPrice, maxPrice]);

  const handleResetFilters = () => {
    setSelectedCategory('');
    setSelectedBrands([]);
    setMinPrice('');
    setMaxPrice('');
  };

  const toggleBrand = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Poppins, sans-serif' }}>
      <h2 style={{ fontSize: '28px', marginBottom: '20px', color: '#2E3A59' }}>🛍️ Product Catalog</h2>

      {/* Filters */}
      <div style={{
        backgroundColor: '#f7f7f7',
        padding: '20px',
        borderRadius: '10px',
        marginBottom: '30px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        {/* Category Dropdown */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            padding: '10px 14px',
            borderRadius: '10px',
            border: '2px solid #ccc',
            fontSize: '16px',
            minWidth: '180px'
          }}
        >
          <option value="">🍽️ All Categories</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>

        {/* Brands Checkboxes */}
        <div>
          <strong style={{ display: 'block', marginBottom: '8px' }}>Brands:</strong>
          {brands.map((brand, index) => (
            <label key={index} style={{ marginRight: '10px', display: 'inline-flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                value={brand}
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                style={{ marginRight: '5px' }}
              />
              {brand}
            </label>
          ))}
        </div>

        {/* Price Inputs */}
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          style={{ padding: '10px', borderRadius: '10px', border: '1px solid #ccc' }}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          style={{ padding: '10px', borderRadius: '10px', border: '1px solid #ccc' }}
        />

        {/* Reset Button */}
        <button onClick={handleResetFilters} style={{
          backgroundColor: '#e74c3c',
          color: 'white',
          padding: '10px 18px',
          border: 'none',
          borderRadius: '10px',
          fontWeight: 'bold',
          cursor: 'pointer',
          alignSelf: 'center'
        }}>
          🔁 Reset Filters
        </button>
      </div>

      {/* Product List */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {filteredProducts.map(product => (
          <div key={product.id} style={{
            backgroundColor: '#fff',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            padding: '15px',
            width: '220px',
            textAlign: 'center'
          }}>
            <h4 style={{ color: '#2E3A59', marginBottom: '10px' }}>{product.name}</h4>
            <p>📦 {product.category}</p>
            <p>🏷️ {product.brand}</p>
            <p>💰 ₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductCatalog;
