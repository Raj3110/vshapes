import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const navLinks = [
  {
    label: "About Us",
    href: "/about",
    dropdown: [
      { label: "Our Company", href: "/about" },
      { label: "Our Machinery", href: "/machinery" },
      { label: "Patents & Certifications", href: "/patents" },
      { label: "Get in Touch", href: "/contact" },
    ],
  },
  { label: "Sustainability", href: "/sustainability" },
  { label: "Solutions", href: "/solutions" },
  { label: "Industries", href: "/industries" },
  { label: "News & Events", href: "/news" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });

    const onClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target))
        setOpenDropdown(null);
    };
    document.addEventListener("mousedown", onClickOutside);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, []);

  const handleNav = (href) => {
    setOpenDropdown(null);
    setMobileOpen(false);
    navigate(href);
  };

  return (
    <>
      <style>{`
        .nav-link {
          font-size: 14px; font-weight: 500;
          color: var(--text-mid); text-decoration: none;
          position: relative; padding-bottom: 3px;
          display: inline-flex; align-items: center; gap: 4px;
          transition: color 0.2s;
          background: none; border: none; cursor: pointer;
          font-family: inherit;
        }
        .nav-link::after {
          content: ""; position: absolute;
          bottom: -1px; left: 0; width: 0; height: 1.5px;
          background: var(--blue-accent); transition: width 0.25s ease;
        }
        .nav-link:hover, .nav-link.active { color: var(--blue-accent); }
        .nav-link:hover::after, .nav-link.active::after { width: 100%; }

        .nav-chevron { opacity: 0.5; transition: transform 0.2s; }
        .nav-chevron.open { transform: rotate(180deg); opacity: 0.8; }

        .nav-dropdown {
          position: absolute; top: calc(100% + 14px); left: 50%;
          transform: translateX(-50%) translateY(-8px);
          min-width: 210px; background: white; border-radius: 14px;
          box-shadow: 0 16px 50px rgba(10,37,64,0.14), 0 2px 8px rgba(10,37,64,0.06);
          border: 1px solid rgba(30,124,232,0.08);
          padding: 8px; opacity: 0; pointer-events: none;
          transition: opacity 0.22s ease, transform 0.22s ease; z-index: 300;
        }
        .nav-dropdown.open {
          opacity: 1; pointer-events: all;
          transform: translateX(-50%) translateY(0);
        }
        .nav-dropdown-item {
          display: block; width: 100%; padding: 10px 14px;
          border-radius: 8px; font-size: 13.5px; font-weight: 500;
          color: var(--text-mid); text-align: left;
          background: none; border: none; cursor: pointer;
          font-family: inherit; transition: background 0.15s, color 0.15s;
        }
        .nav-dropdown-item:hover {
          background: rgba(30,124,232,0.06); color: var(--blue-accent);
        }
        .nav-dropdown-divider {
          height: 1px; background: rgba(30,124,232,0.08); margin: 4px 8px;
        }

        .nav-hamburger {
          display: none; flex-direction: column; gap: 5px;
          background: none; border: none; cursor: pointer; padding: 4px;
        }
        .nav-hamburger span {
          display: block; width: 24px; height: 2px;
          background: var(--blue-dark); border-radius: 2px;
          transition: transform 0.3s, opacity 0.3s; transform-origin: center;
        }
        .nav-hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(5px,5px); }
        .nav-hamburger.open span:nth-child(2) { opacity: 0; }
        .nav-hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px,-5px); }

        .nav-mobile {
          position: fixed; inset: 0; background: white; z-index: 500;
          display: flex; flex-direction: column; padding: 24px;
          transform: translateX(100%); transition: transform 0.3s ease;
        }
        .nav-mobile.open { transform: translateX(0); }
        .nav-mobile-link {
          display: flex; justify-content: space-between; align-items: center;
          width: 100%; padding: 14px 16px; background: none; border: none;
          border-radius: 10px; font-size: 16px; font-weight: 600;
          color: var(--blue-dark); cursor: pointer; font-family: inherit;
          text-align: left; transition: background 0.15s, color 0.15s;
        }
        .nav-mobile-link:hover { background: rgba(30,124,232,0.05); }
        .nav-mobile-link.active { color: var(--blue-accent); }
        .nav-mobile-sublink {
          display: block; width: 100%; padding: 10px 14px;
          background: none; border: none; font-size: 14px; font-weight: 500;
          color: var(--text-mid); cursor: pointer; font-family: inherit;
          text-align: left; border-radius: 8px; transition: color 0.15s;
        }
        .nav-mobile-sublink:hover { color: var(--blue-accent); }

        @media (max-width: 900px) {
          .nav-links-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
        @media (min-width: 901px) {
          .nav-mobile { display: none !important; }
        }
        @media (max-width: 480px) {
          nav { padding: 12px 20px !important; }
        }
      `}</style>

      <nav
        ref={navRef}
        style={{
          position: "relative",
          top: 0,
          zIndex: 200,
          background: "rgba(255,255,255,0.96)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(30,124,232,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 60px",
          boxShadow: scrolled ? "0 4px 30px rgba(10,37,64,0.1)" : "none",
          transition: "box-shadow 0.3s",
        }}
      >
        <img
          src="/logo.png"
          alt="V-Shapes"
          style={{ height: 56, width: "auto", cursor: "pointer" }}
          onClick={() => handleNav("/")}
        />

        {/* Desktop links */}
        <ul
          className="nav-links-desktop"
          style={{
            display: "flex",
            gap: 36,
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          {navLinks.map((link) => (
            <li key={link.label} style={{ position: "relative" }}>
              {link.dropdown ? (
                <>
                  <button
                    className={`nav-link${location.pathname.startsWith(link.href) ? " active" : ""}`}
                    onMouseEnter={() => setOpenDropdown(link.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === link.label ? null : link.label,
                      )
                    }
                  >
                    {link.label}
                    <svg
                      className={`nav-chevron${openDropdown === link.label ? " open" : ""}`}
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                    >
                      <path
                        d="M1 1L5 5L9 1"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                  <div
                    className={`nav-dropdown${openDropdown === link.label ? " open" : ""}`}
                    onMouseEnter={() => setOpenDropdown(link.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    {link.dropdown.map((item, i) => (
                      <div key={item.label}>
                        {i > 0 && i === link.dropdown.length - 1 && (
                          <div className="nav-dropdown-divider" />
                        )}
                        <button
                          className="nav-dropdown-item"
                          onClick={() => handleNav(item.href)}
                        >
                          {item.label}
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <button
                  className={`nav-link${location.pathname === link.href ? " active" : ""}`}
                  onClick={() => handleNav(link.href)}
                >
                  {link.label}
                </button>
              )}
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          className={`nav-hamburger${mobileOpen ? " open" : ""}`}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`nav-mobile${mobileOpen ? " open" : ""}`}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 32,
          }}
        >
          <img src="/logo.png" alt="V-Shapes" style={{ height: 44 }} />
          <button
            onClick={() => setMobileOpen(false)}
            style={{
              background: "none",
              border: "none",
              fontSize: 22,
              cursor: "pointer",
              color: "var(--text-mid)",
            }}
          >
            ✕
          </button>
        </div>
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {navLinks.map((link) => (
            <div key={link.label}>
              <button
                className={`nav-mobile-link${location.pathname.startsWith(link.href) ? " active" : ""}`}
                onClick={() =>
                  link.dropdown
                    ? setOpenDropdown(
                        openDropdown === link.label ? null : link.label,
                      )
                    : handleNav(link.href)
                }
              >
                {link.label}
                {link.dropdown && (
                  <svg
                    className={`nav-chevron${openDropdown === link.label ? " open" : ""}`}
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                  >
                    <path
                      d="M1 1L5 5L9 1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </button>
              {link.dropdown && openDropdown === link.label && (
                <div
                  style={{
                    paddingLeft: 16,
                    marginLeft: 24,
                    borderLeft: "2px solid rgba(30,124,232,0.15)",
                  }}
                >
                  {link.dropdown.map((item) => (
                    <button
                      key={item.label}
                      className="nav-mobile-sublink"
                      onClick={() => handleNav(item.href)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div
          style={{
            paddingTop: 24,
            borderTop: "1px solid rgba(30,124,232,0.1)",
          }}
        >
          <button className="btn-sample" style={{ width: "100%" }}>
            Request for Sample
          </button>
        </div>
      </div>
    </>
  );
}
