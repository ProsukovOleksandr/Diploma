import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import style from './DropDownSelectors.module.css';
import sprite from '../../images/svg/sprite.svg';
import productsSelectors from 'redux/products/selectors';

const DropDownSelectors = ({ onCategoryFilterSelect, onTypeSelect }) => {
  const [isCategoryListOpen, setCategoryIsListOpen] = useState(false);
  const [isTypeListOpen, setTypeListOpen] = useState(false);
  const [type, setType] = useState('Все');
  const [categoryRender, setCategoryRender] = useState('Категорії');

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        setCategoryIsListOpen(false);
        setTypeListOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setTypeListOpen, setCategoryIsListOpen]);

  const categories = useSelector(productsSelectors.getProductsCategories);

  const handleDropDownCategoryList = () => {
    setCategoryIsListOpen(true);
    setTypeListOpen(false);

    if (isCategoryListOpen) {
      setCategoryIsListOpen(false);
    }
  };

  const handleDropDownType = () => {
    setTypeListOpen(true);
    setCategoryIsListOpen(false);

    if (isTypeListOpen) {
      setTypeListOpen(false);
    }
  };

  const onCategorySelect = e => {
    const selectedCategory = e.currentTarget.dataset.category;

    onCategoryFilterSelect(selectedCategory);

    if (selectedCategory === 'all') {
      setCategoryRender('Категорії');
    }
    setCategoryRender(selectedCategory);

    setCategoryIsListOpen(false);
  };

  const onTypeSelection = e => {
    const type = e.currentTarget.dataset.type;

    onTypeSelect(type);
    handleType(type);

    setTypeListOpen(false);
  };

  const handleType = selectedType => {
    switch (selectedType) {
      case 'all':
        setType('Все');
        break;
      case 'рекомендовано':
        setType('Рекомендовано');
        break;
      case 'не рекомендовано':
        setType('Не рекомендовано');
        break;
      default:
    }
  };

  return (
    <>
      <div className={style.categoryListWrapper}>
        <button
          type="button"
          className={style.dropBtnDown}
          onClick={handleDropDownCategoryList}
          value="Categories"
        >
          {categoryRender}
          <svg className={style.dropDownIcon} width="18" height="18">
            <use href={sprite + '#icon-chevron-down'}></use>
          </svg>
        </button>
        {isCategoryListOpen && (
          <ul className={style.catDropList}>
            <li key={nanoid(5)} className={style.categoryItem}>
              <button
                type="button"
                className={style.selectCatBtn}
                data-category={'all'}
                onClick={onCategorySelect}
              >
                Всі категоріі
              </button>
            </li>
            {categories.map(category => {
              return (
                <li key={nanoid(5)} className={style.categoryItem}>
                  <button
                    type="button"
                    className={style.selectCatBtn}
                    onClick={onCategorySelect}
                    data-category={category}
                  >
                    {category}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      {/* !!!!!!!!! */}
      <div className={style.dropDownAllWrapper}>
        <button
          type="button"
          className={style.dropAllBtn}
          onClick={handleDropDownType}
        >
          {type}
          <svg className={style.dropDownIcon} width="18" height="18">
            <use href={sprite + '#icon-chevron-down'}></use>
          </svg>
        </button>

        {isTypeListOpen && (
          <ul className={style.allDropList}>
            <li key={nanoid(5)} className={style.typeItem}>
              <button
                type="button"
                className={style.selectCatBtn}
                onClick={onTypeSelection}
                data-type="all"
              >
                Все
              </button>
            </li>
            <li key={nanoid(5)} className={style.typeItem}>
              <button
                type="button"
                className={style.selectCatBtn}
                onClick={onTypeSelection}
                data-type="recommended"
              >
                Рекомендовані
              </button>
            </li>
            <li key={nanoid(5)} className={style.typeItem}>
              <button
                type="button"
                className={style.selectCatBtn}
                onClick={onTypeSelection}
                data-type="not-recommended"
              >
                Не рекомендовані
              </button>
            </li>
          </ul>
        )}
      </div>
    </>
  );
};

export default DropDownSelectors;

DropDownSelectors.propTypes = {
  onCategoryFilterSelect: PropTypes.func.isRequired,
  onTypeSelect: PropTypes.func.isRequired,
};
