import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setModelFilter,
  selectModels,
} from "../../app/redux/reducers/productReducer.js";
import styles from "./ModelFilter.module.scss";

const ModelFilter = () => {
  const dispatch = useDispatch();
  const models = useSelector(selectModels);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleModelChange = (model: string) => {
    const updatedSelectedModels = selectedModels.includes(model)
      ? selectedModels.filter((m) => m !== model)
      : [...selectedModels, model];
    setSelectedModels(updatedSelectedModels);
    dispatch(setModelFilter(updatedSelectedModels));
  };

  const filteredModels = models.filter((model) =>
    model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedBrands = filteredModels
    .slice()
    .sort((a, b) => a.localeCompare(b));

  return (
    <div className={styles.modelFilter}>
      <span>Model</span>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />
      <div className={styles.modelList}>
        {sortedBrands.map((model) => (
          <div key={model}>
            <label>
              <input
                type="checkbox"
                checked={selectedModels.includes(model)}
                onChange={() => handleModelChange(model)}
              />
              {model}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModelFilter;
