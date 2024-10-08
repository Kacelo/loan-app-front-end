"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "./Nav.module.css"; // For custom styles

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
console.log('is open?', isOpen)
  return (
    <div className={''}>
         <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          LoanHub {/* Change to your new name */}
        </Link>

        {/* Links */}
        <div className={`${styles.navMenu} ${isOpen ? styles.active : ""}`}>
          <Link href="#home" className={styles.navLink}>
            Home
          </Link>
          <Link href="#features" className={styles.navLink}>
            Features
          </Link>
          <Link href="#faq" className={styles.navLink}>
            FAQ
          </Link>
          <Link href="#contact" className={styles.navLink}>
            Contact
          </Link>
          {isOpen && (
             <div className={` ${styles.ctaNavMenuActive} ${isOpen ? styles.active : ""}`}>
             <Link href="/login" className={styles.ctaSecondaryMobile}>
               Log in
             </Link>
             <Link href="/signup" className={styles.ctaPrimaryMobile}>
               Sign Up
             </Link>
           </div>
          )}
        </div>

        {/* CTA */}
        <div className={`${styles.navMenu} `}>
          <Link href="/login" className={styles.ctaSecondary}>
            Log in
          </Link>
          <Link href="/signup" className={styles.ctaPrimary}>
            Sign Up
          </Link>
        </div>
        {/* <Link href="/apply" className={styles.ctaButton}>
          Apply Now
        </Link> */}

        {/* Mobile Menu Icon */}
        <div className={styles.hamburger} onClick={toggleMenu}>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </div>
      </div>
    </nav>
    </div>
 
  );
};

export default Nav;
