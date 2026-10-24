import { useState, useEffect, useCallback } from 'react';
import { profile } from '../data/portfolio.js';
import { useMagnetic } from '../hooks/useTilt.js';
import { handleAnchorClick } from '../utils/scroll.js';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: '工作经历', labelEn: 'ABOUT' },
    { href: '#projects', label: '精选项目', labelEn: 'WORK' },
    { href: '#advantages', label: '个人优势', labelEn: 'SKILLS' },
    { href: '#contact', label: '联系我', labelEn: 'CONTACT' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <a
          href="#top"
          className="navbar__logo"
          onClick={(e) => handleAnchorClick(e)}
        >
          <span className="navbar__logo-mark">罗良禄</span>
        </a>

        <ul className="navbar__links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="navbar__link"
                onClick={(e) => handleAnchorClick(e)}
              >
                <span className="navbar__link-cn">{link.label}</span>
                <span className="navbar__link-en">{link.labelEn}</span>
              </a>
            </li>
          ))}
        </ul>

        <MagneticCta />
      </div>
    </nav>
  );
}

function MagneticCta() {
  const magRef = useMagnetic({ strength: 0.3, speed: 0.5 });
  return (
    <a
      ref={magRef}
      href="#contact"
      className="navbar__cta"
      onClick={(e) => handleAnchorClick(e)}
    >
      <span className="navbar__cta-dot"></span>
      <span>联系我</span>
    </a>
  );
}
