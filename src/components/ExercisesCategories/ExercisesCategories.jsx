//ExercisesCategories

import React, { useEffect, useState } from 'react';
import ExerciseSubcategoriesList from '../ExercisesSubcategoriesList/ExercisesSubcategoriesList.jsx';
import styles from '../ExercisesCategories/ExercisesCategories.module.css';
import { fetchFilters } from 'redux/exercises/operations.js';
import { useDispatch } from 'react-redux';

const ExercisesCategories = () => {
  const dispatch = useDispatch();
  const [activeSubcategory, setActiveSubcategory] = useState('Частини тіла');

  const handleSubcategoryClick = subcategory => {
    setActiveSubcategory(subcategory);
  };

  useEffect(() => {
    dispatch(fetchFilters());
  }, [dispatch]);

  return (
    <div className={styles.bg}>
      <div className={styles.categoryButtons}>
        <button
          className={`${styles.btnCategories} ${
            activeSubcategory === 'Частини тіла' ? styles.active : ''
          }`}
          onClick={() => handleSubcategoryClick('Частини тіла')}
        >
          Частини Тіла
        </button>

        <button
          className={`${styles.btnCategories} ${
            activeSubcategory === "М'язи" ? styles.active : ''
          }`}
          onClick={() => handleSubcategoryClick("М'язи")}
        >
          М'язи
        </button>

        <button
          className={`${styles.btnCategories} ${
            activeSubcategory === 'Обладнання' ? styles.active : ''
          }`}
          onClick={() => handleSubcategoryClick('Обладнання')}
        >
          Обладнання
        </button>
      </div>

      {activeSubcategory && (
        <ExerciseSubcategoriesList
          subcategory={activeSubcategory}
          onSelectExercise={exercise => console.log(exercise)}
        />
      )}
    </div>
  );
};

export default ExercisesCategories;
