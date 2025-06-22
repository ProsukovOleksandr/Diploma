import { NavLink } from 'react-router-dom';
import css from './NavigationMenu.module.css';
function NavigationMenu() {
  return (
    <nav className={css.navigaton}>
      <ul className={css.navigation_list}>
        <li>
          <NavLink to="/diary" className={css.navigation_link}>
            Щоденник
          </NavLink>
        </li>
        <li>
          <NavLink to="/products" className={css.navigation_link}>
            Продукти
          </NavLink>
        </li>
        <li>
          <NavLink to="/exercises" className={css.navigation_link}>
            Вправи
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationMenu;
