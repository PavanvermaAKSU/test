import { useState } from "react";
import { Menu, X, ChevronDown, ChevronRight, Phone, ArrowUpRight } from "lucide-react";

import { navbarData, navbarConfig } from "./navbardata";
import "./navbar.css";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // top-level: "Services", "Products"...
  const [openSub, setOpenSub] = useState(null); // nested: "Products/Lubricants"...

  const closeMenu = () => {
    setMobileOpen(false);
    setOpenDropdown(null);
    setOpenSub(null);
  };

  const toggleDropdown = (label) => {
    setOpenSub(null);
    setOpenDropdown((current) => (current === label ? null : label));
  };

  const toggleSub = (key) => {
    setOpenSub((current) => (current === key ? null : key));
  };

  return (
    <header className="site-header">
      <div className="navbar-topbar">
        <div className="navbar-container navbar-topbar-inner">
          <span>{navbarConfig.topbarMessage}</span>

          <a href={navbarConfig.ctaHref} className="navbar-topbar-link">
            {navbarConfig.enquiryLabel}
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>

      <nav className="navbar-main" aria-label="Main navigation">
        <div className="navbar-container navbar-inner">
          <a
            href="#home"
            className="navbar-brand"
            onClick={closeMenu}
            aria-label="Samarveer Auto and Lubes home"
          >
            <img
              src={navbarConfig.logo}
              alt="Samarveer Auto & Lubes logo"
              className="navbar-logo"
            />
          </a>

          <button
            type="button"
            className="navbar-mobile-toggle"
            onClick={() => setMobileOpen((current) => !current)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="navbar-content"
          >
            {mobileOpen ? <X size={25} /> : <Menu size={25} />}
          </button>

          <div
            id="navbar-content"
            className={`navbar-content ${mobileOpen ? "navbar-content-open" : ""}`}
          >
            <div className="navbar-links">
              {navbarData.map((item) => (
                <div className="navbar-item" key={item.label}>
                  {item.children ? (
                    <>
                      <button
                        type="button"
                        className={`navbar-link navbar-dropdown-trigger ${
                          openDropdown === item.label ? "navbar-link-active" : ""
                        }`}
                        onClick={() => toggleDropdown(item.label)}
                        aria-expanded={openDropdown === item.label}
                      >
                        {item.label}
                        <ChevronDown
                          size={15}
                          className={`navbar-chevron ${
                            openDropdown === item.label ? "navbar-chevron-open" : ""
                          }`}
                        />
                      </button>

                      <div
                        className={`navbar-dropdown ${
                          openDropdown === item.label ? "navbar-dropdown-open" : ""
                        }`}
                      >
                        <div className="navbar-dropdown-heading">
                          <span>EXPLORE {item.label.toUpperCase()}</span>
                          <span className="navbar-dropdown-line" />
                        </div>

                        {item.children.map((child) => {
                          /* ---- child with its own dropdown (e.g. Products > Lubricants) ---- */
                          if (child.children) {
                            const key = `${item.label}/${child.label}`;
                            const subOpen = openSub === key;

                            return (
                              <div className="navbar-sub" key={child.label}>
                                <button
                                  type="button"
                                  className="navbar-dropdown-link navbar-sub-trigger"
                                  onClick={() => toggleSub(key)}
                                  aria-expanded={subOpen}
                                >
                                  <span className="navbar-dropdown-copy">
                                    <strong>{child.label}</strong>
                                    {child.description && <small>{child.description}</small>}
                                  </span>
                                  <ChevronRight
                                    size={16}
                                    className={`navbar-sub-chevron ${
                                      subOpen ? "navbar-sub-chevron-open" : ""
                                    }`}
                                  />
                                </button>

                                <div
                                  className={`navbar-submenu ${
                                    subOpen ? "navbar-submenu-open" : ""
                                  }`}
                                >
                                  {child.href && (
                                    <a
                                      href={child.href}
                                      className="navbar-dropdown-link navbar-submenu-link navbar-submenu-all"
                                      onClick={closeMenu}
                                    >
                                      <span className="navbar-dropdown-copy">
                                        <strong>View all {child.label}</strong>
                                      </span>
                                      <ArrowUpRight size={15} />
                                    </a>
                                  )}

                                  {child.children.map((grand) => (
                                    <a
                                      href={grand.href}
                                      key={grand.label}
                                      className="navbar-dropdown-link navbar-submenu-link"
                                      onClick={closeMenu}
                                    >
                                      <span className="navbar-dropdown-copy">
                                        <strong>{grand.label}</strong>
                                        {grand.description && <small>{grand.description}</small>}
                                      </span>
                                      <ArrowUpRight size={15} />
                                    </a>
                                  ))}
                                </div>
                              </div>
                            );
                          }

                          /* ---- normal child link ---- */
                          return (
                            <a
                              href={child.href}
                              key={child.label}
                              className="navbar-dropdown-link"
                              onClick={closeMenu}
                            >
                              <span className="navbar-dropdown-copy">
                                <strong>{child.label}</strong>
                                {child.description && <small>{child.description}</small>}
                              </span>

                              <ArrowUpRight size={16} />
                            </a>
                          );
                        })}
                      </div>
                    </>
                  ) : (
                    <a href={item.href} className="navbar-link" onClick={closeMenu}>
                      {item.label}
                    </a>
                  )}
                </div>
              ))}
            </div>

            <a href={navbarConfig.ctaHref} className="navbar-cta" onClick={closeMenu}>
              <Phone size={16} />
              <span>{navbarConfig.ctaLabel}</span>
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;