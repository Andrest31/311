import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Text from '../Text/Text';
import Basket from '../Basket/Basket';
import User from '../User/User';

const Header: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>('Product');

  const handleItemClick = (item: string) => {
    setActiveItem(item);
  };

  return (
    <header className="header">
      <div className="header__container _container">
        <div className="header__logo">
          <Link to="/"> {/* Добавляем Link к главной странице */}
            <Logo />
          </Link>
        </div>

        <nav className="header__menu menu">
          <ul className="menu__list">
            <li
              className={`menu__item ${activeItem === 'Product' ? 'active' : ''}`}
              onClick={() => handleItemClick('Product')}
            >
              <Text tag="p" view="p-18">Product</Text>
            </li>
            <li
              className={`menu__item ${activeItem === 'Categories' ? 'active' : ''}`}
              onClick={() => handleItemClick('Categories')}
            >
              <Text tag="p" view="p-18">Categories</Text>
            </li>
            <li
              className={`menu__item ${activeItem === 'About us' ? 'active' : ''}`}
              onClick={() => handleItemClick('About us')}
            >
              <Text tag="p" view="p-18">About us</Text>
            </li>
          </ul>
        </nav>

        <div className="header__icons">
          <Basket />
          <User />
        </div>
      </div>
    </header>
  );
};

export default Header;
