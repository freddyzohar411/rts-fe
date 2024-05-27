import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  Form,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";

import { routeData, moduleRouteData } from "../common/routeData";

//import images
import logoPulse from "../assets/images/logo-pulse.png";

//import Components
import SearchOption from "../Components/Common/SearchOption";
import ProfileDropdown from "../Components/Common/ProfileDropdown";

import { changeSidebarVisibility } from "../store/actions";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

const Header = ({ headerClass }) => {
  const [search, setSearch] = useState(false);
  const toogleSearch = () => {
    setSearch(!search);
  };

  const location = useLocation();
  const path = location.pathname;
  const [breadCrumbData, setBreadcrumbData] = useState([]);

  const pageData = (pathname) => {
    const module = moduleRouteData.find((route) =>
      pathname.startsWith(route.path)
    );
    const page = routeData.find((route) => {
      const pattern = route.path.replace("/:id", "/\\d+");
      return new RegExp(`^${pattern}$`).test(pathname);
    });
    return [module, page];
  };

  useEffect(() => {
    if (path) {
      const breadCrumb = pageData(path);
      setBreadcrumbData(breadCrumb.filter((data) => data !== undefined));
    }
  }, [path]);

  const dispatch = useDispatch();
  const sidebarVisibilityData = createSelector(
    (state) => state.Layout.sidebarVisibilitytype,
    (sidebarVisibilitytype) => sidebarVisibilitytype
  );

  // Inside your component
  const sidebarVisibilitytype = useSelector(sidebarVisibilityData);

  const toogleMenuBtn = () => {
    var windowSize = document.documentElement.clientWidth;
    dispatch(changeSidebarVisibility("show"));
    if (windowSize > 767)
      document?.querySelector(".hamburger-icon")?.classList?.toggle("open");
    //For collapse horizontal menu
    if (document.documentElement.getAttribute("data-layout") === "horizontal") {
      document.body.classList.contains("menu")
        ? document.body.classList.remove("menu")
        : document.body.classList.add("menu");
    }
    //For collapse vertical and semibox menu
    if (
      sidebarVisibilitytype === "show" &&
      (document.documentElement.getAttribute("data-layout") === "vertical" ||
        document.documentElement.getAttribute("data-layout") === "semibox")
    ) {
      if (windowSize < 1025 && windowSize > 767) {
        document.body.classList.remove("vertical-sidebar-enable");
        document.documentElement.getAttribute("data-sidebar-size") === "sm"
          ? document.documentElement.setAttribute("data-sidebar-size", "")
          : document.documentElement.setAttribute("data-sidebar-size", "sm");
      } else if (windowSize > 1025) {
        document.body.classList.remove("vertical-sidebar-enable");
        document.documentElement.getAttribute("data-sidebar-size") === "lg"
          ? document.documentElement.setAttribute("data-sidebar-size", "sm")
          : document.documentElement.setAttribute("data-sidebar-size", "lg");
      } else if (windowSize <= 767) {
        document.body.classList.add("vertical-sidebar-enable");
        document.documentElement.setAttribute("data-sidebar-size", "lg");
      }
    }
    //Two column menu
    if (document.documentElement.getAttribute("data-layout") === "twocolumn") {
      document.body.classList.contains("twocolumn-panel")
        ? document.body.classList.remove("twocolumn-panel")
        : document.body.classList.add("twocolumn-panel");
    }
  };

  return (
    <React.Fragment>
      <header id="page-topbar" className={headerClass}>
        <div className="layout-width">
          <div className="navbar-header">
            <div className="d-flex">
              <div className="navbar-brand-box horizontal-logo">
                <Link to="/" className="logo logo-dark">
                  <span className="logo-sm">
                    <img src={logoPulse} alt="" height="22" />
                  </span>
                  <span className="logo-lg">
                    <img src={logoPulse} alt="" height="17" />
                  </span>
                </Link>

                <Link to="/" className="logo logo-light">
                  <span className="logo-sm">
                    <img src={logoPulse} alt="" height="22" />
                  </span>
                  <span className="logo-lg">
                    <img src={logoPulse} alt="" height="50" />
                  </span>
                </Link>
              </div>

              <button
                onClick={toogleMenuBtn}
                type="button"
                className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger"
                id="topnav-hamburger-icon"
              >
                <span className="hamburger-icon">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </button>

              <Breadcrumb className="d-flex flex-row justify-content-center align-items-center pt-3 ps-3">
                <BreadcrumbItem>
                  <Link to="/">
                    <i className="ri-home-3-line"></i>
                  </Link>
                </BreadcrumbItem>
                {breadCrumbData &&
                  breadCrumbData?.length > 0 &&
                  breadCrumbData?.map((data, index) => (
                    <BreadcrumbItem key={index}>
                      <Link to={data.path}>
                        <span
                          className={
                            index === 1 &&
                            "bg-light py-1 px-2 rounded fw-semibold"
                          }
                        >
                          {data.name}
                        </span>
                      </Link>
                    </BreadcrumbItem>
                  ))}
              </Breadcrumb>
            </div>

            <div className="d-flex align-items-center">
              <SearchOption />
              <Dropdown
                isOpen={search}
                toggle={toogleSearch}
                className="d-md-none topbar-head-dropdown header-item"
              >
                <DropdownToggle
                  type="button"
                  tag="button"
                  className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
                >
                  <i className="bx bx-search fs-22"></i>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-lg dropdown-menu-end p-0">
                  <Form className="p-3">
                    <div className="form-group m-0">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search ..."
                          aria-label="Recipient's username"
                        />
                        <button className="btn btn-primary" type="submit">
                          <i className="mdi mdi-magnify"></i>
                        </button>
                      </div>
                    </div>
                  </Form>
                </DropdownMenu>
              </Dropdown>
              {/* <NotificationDropdown /> */}
              <ProfileDropdown />
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;
