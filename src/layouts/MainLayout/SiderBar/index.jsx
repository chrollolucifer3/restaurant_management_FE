import React, { useState } from 'react';
import styles from './styles.module.scss';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from "react-redux";
import { MenuFoldOutlined } from "@ant-design/icons";
import Logo from 'assets/images/logo/logo.jpg';
import IconLogo from 'assets/images/logo/iconlogo.jpg';
import NavItem from "./components/NavItem";
import { routeMap } from "../../../router/routeMap";
import { handleCheckRoute } from "../../../utils/helper";
import { useLocation, useNavigate } from "react-router-dom";
import { handleSetIsShowSideBar } from "../../../states/modules/app";

SideBar.propTypes = {
  isShowSideBar: PropTypes.bool.isRequired,
  handleToggleIsShowSideBar: PropTypes.func,
};

SideBar.defaultProps = {
  isShowSideBar: true,
};

function SideBar(props) {
  const { isShowSideBar, handleToggleIsShowSideBar } = props;
  const [indexNavItemSelect, setIndexNavItemSelect] = useState(null);
  const [menuSub, setMenuSub] = useState([]);
  const [topMenuSub, setTopMenuSub] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userRole = useSelector((state) => state.auth.authUser.role_name);
  // Lọc các route có quyền truy cập tương ứng với userRole
  const filteredRoutes = routeMap.filter((route) => route.permissions.includes(userRole));

  const handleToggleMenu = (indexNavItem, menuNavItem) => {
    if (menuNavItem.path) {
      navigate(menuNavItem.path);
    }
    if (isShowSideBar) {
      setIndexNavItemSelect(indexNavItem !== indexNavItemSelect ? indexNavItem : null);
    }
  };

  const handleHoverMenuNavItem = (e, menuNavItem) => {
    const { top } = e.target.getBoundingClientRect();
    setTopMenuSub(top);
    if (menuNavItem.children) {
      setMenuSub(menuNavItem.children);
    } else {
      setMenuSub([]);
    }
  };

  const handleLeaveMenuNavItem = () => {
    setMenuSub([]);
  };

  return (
    <div
      onMouseLeave={() => handleLeaveMenuNavItem()}
      className={`${styles.sideBarWrap} ${!isShowSideBar ? styles.sideBarWrapClose : ''}`}
    >
      <div
        onClick={() => navigate('/')}
        className={styles.logoWrap}
      >
        {isShowSideBar ? (
          <div className={`${styles.imgWrap}`}>
            <img src={Logo} alt="Logo" />
          </div>
        ) : (
          <div className={`${styles.imgWrap} ${styles.imgWrapDesktop}`}>
            <img src={IconLogo} alt="Icon Logo" />
          </div>
        )}

        <div
          className={`${styles.btnToggleSideBar} ${styles.btnToggleSideBarMobi} ${!isShowSideBar ? styles.btnToggleSideBarClose : ''}`}
          onClick={() => handleToggleIsShowSideBar()}
        >
          <MenuFoldOutlined />
        </div>
      </div>

      <div className={`${styles.navbarWrap}`}>
        <ul className={`${styles.menuNav}`}>
          {filteredRoutes.map((route, index) => (
            <li
              onMouseEnter={(e) => handleHoverMenuNavItem(e, route)}
              onClick={() => handleToggleMenu(index, route)}
              key={route.path}
              className={`${styles.menuNavItem} ${
                handleCheckRoute(route.routeActive, location.pathname) ? styles.menuNavItemActive : ''
              }`}
            >
              <NavItem route={route} isShowMenu={index === indexNavItemSelect} />
            </li>
          ))}
        </ul>
      </div>

      <div className={`${styles.btnToggleIsShowSideBar} ${!isShowSideBar ? styles.btnToggleIsHideSideBar : ''}`}>
        <svg
          onClick={() => dispatch(handleSetIsShowSideBar(!isShowSideBar))}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M13.5.5 7.5 8l6 7.5" stroke="currentColor" />
          <path d="M8.5.5 2.5 8l6 7.5" stroke="currentColor" />
        </svg>
      </div>

      {!isShowSideBar && menuSub && menuSub.length > 0 && (
        <div className={`${styles.boxMenuSubWrap}`} style={{ top: `${topMenuSub}px` }}>
          <div className={styles.listMenuSub}>
            <ul className={styles.menuSubClose}>
              {menuSub.map((menuSubItem) => (
                <li className={styles.menuSubCloseItem} key={`close${menuSubItem.path}`}>
                  <div
                    onClick={() => navigate(menuSubItem.path)}
                    className={`${styles.contentSubItemWrap} ${
                      handleCheckRoute(menuSubItem.routeActive, location.pathname) ? styles.menuSubItemActive : ''
                    }`}
                  >
                    <div className={styles.textWrap}>
                      <span className={styles.text}>{menuSubItem.label}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default SideBar;
