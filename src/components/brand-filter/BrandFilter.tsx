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
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const handleBrandChange = (brand) => {
    const updatedSelectedBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];
    setSelectedBrands(updatedSelectedBrands);
    dispatch(setBrandFilter(updatedSelectedBrands));
  };

  return (
    <div className={styles.brandFilter}>
      <h3>Filter by Brand</h3>
      <div className={styles.brandList}>
        {brands.map((brand) => (
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
