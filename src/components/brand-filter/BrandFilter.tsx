import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setBrandFilter,
  selectBrands,
} from "../../app/redux/reducers/productReducer.js";
import styles from "./BrandFilter.module.scss";

const BrandFilter = () => {
  const dispatch = useDispatch();
  const brands = useSelector(selectBrands);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleBrandChange = (brand) => {
    const updatedSelectedBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];
    setSelectedBrands(updatedSelectedBrands);
    dispatch(setBrandFilter(updatedSelectedBrands));
  };

  const filteredModels = brands.filter((model) =>
    model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedBrands = filteredModels
    .slice()
    .sort((a, b) => a.localeCompare(b));

  return (
    <div className={styles.brandFilter}>
      <span>Brand</span>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />
      <div className={styles.brandList}>
        {sortedBrands.map((brand) => (
          <div key={brand}>
            <label>
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => handleBrandChange(brand)}
              />
              {brand}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandFilter;
