import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSortOption } from "../../app/redux/reducers/productReducer.js";
import styles from "./Sort.module.scss";

const Sort = () => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSortChange = (option: string) => {
    const newOption = selectedOption === option ? null : option;
    setSelectedOption(newOption);
    dispatch(setSortOption(newOption));
  };

  return (
    <div className={styles.sortOptions}>
      <span>Sort By</span>
      <div className={styles.optionList}>
        <label>
          <input
            type="radio"
            checked={selectedOption === "highToLow"}
            onChange={() => handleSortChange("highToLow")}
          />
          High to Low
        </label>
        <label>
          <input
            type="radio"
            checked={selectedOption === "lowToHigh"}
            onChange={() => handleSortChange("lowToHigh")}
          />
          Low to High
        </label>
        <label>
          <input
            type="radio"
            checked={selectedOption === "newToOld"}
            onChange={() => handleSortChange("newToOld")}
          />
          New to Old
        </label>
        <label>
          <input
            type="radio"
            checked={selectedOption === "oldToNew"}
            onChange={() => handleSortChange("oldToNew")}
          />
          Old to New
        </label>
      </div>
    </div>
  );
};

export default Sort;
