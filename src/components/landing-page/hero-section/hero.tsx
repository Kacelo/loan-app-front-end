"use client";

import styles from "./Hero.module.css"; // For custom styles

interface HeroProps {
imageUrl: string
}
const Hero = () => {
    return (
      <section className={styles.heroContent}>
        <div className={''}>
          {/* Headline */}
          <h1 className={styles.heroTitle}>Manage Loans with Ease and Confidence</h1>
          
          {/* Subheadline */}
          <p className={styles.heroSubtitle}>
            Simplify your loan application, approval, and tracking process all in one platform.
          </p>
          
          {/* Call to Action */}
          <div className={styles.heroCta}>
            <a href="/signup">
              <button className={styles.ctaPrimary}>Get Started</button>
            </a>
            <a href="/learn-more" className={styles.ctaSecondary}>Learn More</a>
          </div>
        </div>
  
        {/* Hero Image */}
        <div className={styles.heroImage}>
          <img src="/hero-image.png" alt="Loan Management Dashboard" />
        </div>
      </section>
    );
  };
export default Hero