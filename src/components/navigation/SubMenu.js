import { Link } from "gatsby";
import React, { useState } from "react";
import CloseIcon from "../../assets/svg/close-menu.svg";
import OpenIcon from "../../assets/svg/open-menu.svg";
import { useWebsiteData } from "../../context/AppContext";

const SubMenu = ({ item, menuTitle }) => {
  const [open, setOpen] = useState(false);
  const { dispatch } = useWebsiteData();
  return (
    <div className="mobile-nav-item-submenu">
      <div
        className={`sub-menu-toggle ${open ? "active-submenu" : ""}`}
        onClick={() => setOpen(!open)}
      >
        {menuTitle} <img src={open ? CloseIcon : OpenIcon} alt="submenu" />
      </div>
      <div className={`mobile-nav-submenu-item ${open ? "open-submenu" : ""}`}>
        {item.map((i, key) => (
          <Link
            onClick={() => dispatch({ type: "tempAgent", value: "" })}
            key={key}
            to={i.uri}
          >
            {i.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SubMenu;
