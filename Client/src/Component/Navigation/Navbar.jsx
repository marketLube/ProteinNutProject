import React, { useRef, useState, useEffect } from "react";
import { motion, useCycle } from "framer-motion";
import { Link } from "react-router-dom";
import Logo from "../../Utils/Logo/Logo";
import styles from "./Navbar.module.css";
import { FaGripLines } from "react-icons/fa6";
import { scrollToTarget } from "../../Helper/scrollToTarget";

const navItems = [
  { name: "Shop", id: "grid" },
  { name: "Community", id: "community" },
  { name: "Contact", id: "contact" },
  { name: "Profile", id: "profile" },
  { name: "Cart", id: "cart" },
];

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height + 100}px at calc(100% - 30px) 30px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(16px at calc(100% - 39px) 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const navVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const navItemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

export const Navbar = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showBackground, setShowBackground] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
      setShowBackground(position > 100);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getBackgroundStyles = () => {
    // Base styles
    const baseStyles = {
      position: 'fixed',
      left: 0,
      right: 0,
      backgroundColor: 'rgba(255, 255, 255, 1)',
      zIndex: -100,
      opacity: 1,
      transition: 'top 0.3s ease-in-out',
      pointerEvents: 'none',
      borderBottomLeftRadius: '4rem',
      borderBottomRightRadius: '4rem',
    };

    // For iPhone 14 Pro Max and similar large devices (428px width)
    if (windowWidth >= 428) {
      return {
        ...baseStyles,
        top: showBackground ? '0' : '-9%',
        height: '9%',
      };
    }

    // For smaller devices
    return {
      ...baseStyles,
      top: showBackground ? '0' : '-11.5%',
      height: '11.5%',
    };
  };

  const handleNavClick = (id) => {
    toggleOpen();

    switch (id) {
      case "profile":
        toggleOpen();
        window.location.href = "/myaccount";
        break;
      case "cart":
        window.location.href = "/cartpage";
        break;
      default:
        scrollToTarget(id)();
    }
  };

  return (
    <div className={styles.naavbar}>
      {/* Dynamic background with responsive styles */}
      <div style={getBackgroundStyles()} />

      <div>
        <Link to="/">
          <Logo style={{marginLeft:"-1rem"}} />
        </Link>
  
        <motion.nav
          initial={false}
          animate={isOpen ? "open" : "closed"}
          custom={1000}
          ref={containerRef}
          style={{ zIndex: 999 }}
        >
          <motion.div
            className="background"
            variants={sidebar}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#ffffff",
              padding: 0,
            }}
          >
            <motion.ul
              variants={navVariants}
              style={{
                padding: "25px",
                position: "absolute",
                top: "100px",
                width: "100vw",
                margin: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {navItems.map((item, i) => (
                <motion.li
                  key={i}
                  variants={navItemVariants}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNavClick(item.id)}
                  style={{
                    listStyle: "none",
                    marginBottom: "20px",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    fontSize: "2rem",
                    textAlign: "center",
                  }}
                >
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <div
                      className="text-placeholder"
                      style={{
                        width: "100%",
                        borderRadius: "5px",
                        color: "#43bb0b",
                        fontWeight: "bold",
                      }}
                    >
                      {item.name}
                    </div>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
  
          <button
            onClick={() => toggleOpen()}
            style={{
              outline: "none",
              border: "none",
              cursor: "pointer",
              position: "absolute",
              top: ".4rem",
              right: "3.9rem",
              width: "4rem",
              height: "4rem",
              borderRadius: "50%",
              background: "#5c8e55",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 999,
            }}
          >
            <FaGripLines size={24} color="#fff" />
          </button>
        </motion.nav>
      </div>
    </div>
  );
};