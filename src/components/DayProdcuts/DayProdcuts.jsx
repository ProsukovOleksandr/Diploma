import css from './DayProducts.module.css';
import { Link } from 'react-router-dom';
import { DayProductItem } from './DayProductItem';
import { selectIsLoadingProducts, selectError } from 'redux/diary/selectors';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { Rings } from 'react-loader-spinner';
import svg from '../../images/svg/sprite.svg';

export const DayProducts = ({ productsData }) => {
  const isLoading = useSelector(selectIsLoadingProducts);
  const error = useSelector(selectError);
  return (
    <div className={css.productsContainer}>
      <div className={css.productsTopBar}>
        <p className={css.productsTitle}>Продукти</p>
        <Link to="/products" className={css.Link}>
          Додати продукти
          <svg width="16px" height="16px">
            <use href={svg + '#icon-arrow-right'}></use>
          </svg>
        </Link>
      </div>
      {isLoading ? (
        <Rings
          height="100"
          width="100"
          color="#e6533c"
          ariaLabel="rings-loading"
          wrapperStyle={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100vh',
          }}
          wrapperClass=""
          visible={true}
          firstLineColor=""
          middleLineColor=""
          lastLineColor=""
        />
      ) : (
        <>
          {(!productsData || productsData.length === 0 || error) && (
            <p className={css.noProductsText}>Продукти не знайдено</p>
          )}

          {productsData.length !== 0 && (
            <div className={css.productsBottomBar}>
              <ul className={css.adaptiveTitlesList}>
                <li className={css.adaptiveTitle}>Назва</li>
                <li className={css.adaptiveTitle}>Категорія</li>
                <li className={css.adaptiveTitle}>Калорії</li>
                <li className={css.adaptiveTitle}>Вага</li>
                <li className={css.adaptiveTitle}>Рекомендовано</li>
              </ul>

              <ul className={css.productsList}>
                {productsData.map((item, index) => {
                  return <DayProductItem data={item} key={index} />;
                })}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};
