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

  const handleModelChange = (model) => {
    const updatedSelectedModels = selectedModels.includes(model)
      ? selectedModels.filter((m) => m !== model)
      : [...selectedModels, model];
    setSelectedModels(updatedSelectedModels);
    dispatch(setModelFilter(updatedSelectedModels));
  };

  return (
    <div className={styles.modelFilter}>
      <h3>Filter by Model</h3>
      <div className={styles.modelList}>
        {models.map((model) => (
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
