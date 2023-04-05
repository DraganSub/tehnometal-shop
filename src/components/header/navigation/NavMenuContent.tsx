import React from 'react';
import { CiSearch } from 'react-icons/ci';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BsPerson, BsPersonFill } from 'react-icons/bs';
import { FaSignOutAlt } from 'react-icons/fa';
import {
  RiShoppingCart2Line,
  RiShoppingCart2Fill,
  RiSearchFill
} from 'react-icons/ri';
import { Logo } from '.';
import { HoverableIcon } from '../../hoverable-icon';
import { NavLink } from 'react-router-dom';

interface IProps {
  isNavActive: boolean;
  isNavMenuOpen: boolean;
}

export default function NavMenuContent(
  props: IProps
): React.ReactElement | null {
  const { isNavActive, isNavMenuOpen } = props;

  if (isNavActive) {
    return (
      <>
        <Logo isNavActive={isNavActive} isNavMenuOpen={isNavMenuOpen} />
        <div className='nav--group'>
          <ul className='nav--list flex'>
            <li className='nav--item'>
              <NavLink
                to='/'
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {' '}
                Home
              </NavLink>
            </li>
            <li className='nav--item'>
              <NavLink
                className={({ isActive }) => (isActive ? 'active' : '')}
                to='/categories'
              >
                Products
              </NavLink>
            </li>
            <li className='nav--item'>
              <NavLink
                className={({ isActive }) => (isActive ? 'active' : '')}
                to='/news'
              >
                News
              </NavLink>
            </li>
            <li className='nav--item'>
              <NavLink
                className={({ isActive }) => (isActive ? 'active' : '')}
                to='/about-us'
              >
                About Us
              </NavLink>
            </li>
            <li className='nav--item'>
              <NavLink
                className={({ isActive }) => (isActive ? 'active' : '')}
                to='/contact-us'
              >
                Contact Us
              </NavLink>
            </li>
          </ul>
        </div>
        <div className='nav--group'>
          <ul className='nav--list flex nav--list__icons'>
            <li className='nav--item nav--item__i'>
              <HoverableIcon
                regularIcon={<CiSearch />}
                hoverIcon={<RiSearchFill />}
              />
            </li>
            <li className='nav--item'>
              <NavLink
                className={({ isActive }) => (isActive ? 'active' : '')}
                to='/auth/login'
              >
                Sign In
              </NavLink>
            </li>
            <li className='nav--item nav--item__i'>
              <HoverableIcon
                regularIcon={<AiOutlineHeart />}
                hoverIcon={<AiFillHeart />}
                path='/favorites'
              />
            </li>
            <li className='nav--item nav--item__i'>
              <HoverableIcon
                regularIcon={<BsPerson />}
                hoverIcon={<BsPersonFill />}
                path='/profile'
              />
            </li>
            <li className='nav--item nav--item__i'>
              <HoverableIcon
                regularIcon={<RiShoppingCart2Line />}
                hoverIcon={<RiShoppingCart2Fill />}
                path='/cart'
              />
            </li>
            <li className='nav--item nav--item__i'>
              <FaSignOutAlt />
            </li>
          </ul>
        </div>
      </>
    );
  }
  if (!isNavActive && isNavMenuOpen) {
    return (
      <>
        <div className='nav--group'>
          <ul className='nav--list flex nav--list__icons'>
            <li className='nav--item nav--item__i'>
              <HoverableIcon
                regularIcon={<BsPerson />}
                hoverIcon={<BsPersonFill />}
                path='/profile'
              />
            </li>
            <li className='nav--item nav--item__i'>
              <HoverableIcon
                regularIcon={<RiShoppingCart2Line />}
                hoverIcon={<RiShoppingCart2Fill />}
                path='/cart'
              />
            </li>
          </ul>
          <ul className='nav--list flex flex-column'>
            <li className='nav--item'>
              <NavLink
                className={({ isActive }) => (isActive ? 'active' : '')}
                to='/'
              >
                {' '}
                <span>Home</span>
              </NavLink>
            </li>
            <li className='nav--item'>
              <NavLink
                className={({ isActive }) => (isActive ? 'active' : '')}
                to='/categories'
              >
                <span>Products</span>
              </NavLink>
            </li>
            <li className='nav--item'>
              <NavLink
                className={({ isActive }) => (isActive ? 'active' : '')}
                to='/news'
              >
                <span>News</span>
              </NavLink>
            </li>
            <li className='nav--item'>
              <NavLink
                className={({ isActive }) => (isActive ? 'active' : '')}
                to='/about-us'
              >
                <span>About Us</span>
              </NavLink>
            </li>
            <li className='nav--item'>
              <NavLink
                className={({ isActive }) => (isActive ? 'active' : '')}
                to='/contact-us'
              >
                <span>Contact Us</span>
              </NavLink>
            </li>
            <li className='nav--item'>
              <NavLink
                className={({ isActive }) => (isActive ? 'active' : '')}
                to='/auth/login'
              >
                <span>Sign In</span>
              </NavLink>
            </li>
          </ul>
          <ul className='nav--list flex flex-column'>
            <li className='nav--item nav--item__i'>
              <FaSignOutAlt />
            </li>
            <li className='nav--item nav--item__i'>
              <HoverableIcon
                regularIcon={<CiSearch />}
                hoverIcon={<RiSearchFill />}
              />
            </li>
            <li className='nav--item nav--item__i'>
              <HoverableIcon
                regularIcon={<AiOutlineHeart />}
                hoverIcon={<AiFillHeart />}
              />
            </li>
          </ul>
          <Logo isNavActive={isNavActive} isNavMenuOpen={isNavMenuOpen} />
        </div>
      </>
    );
  }

  return null;
}
