import { useState, useEffect, useRef } from 'react';
import { profile } from '../data/portfolio.js';
import { handleAnchorClick } from '../utils/scroll.js';
import './Hero.css';

// 生成秋叶粒子
const generateLeaves = (count) => {
  const leaves = [];
  for (let i = 0; i < count; i++) {
    leaves.push({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 15,
      duration: 10 + Math.random() * 12,
      size: 16 + Math.random() * 24,
      swayAmp: 30 + Math.random() * 50,
      rotationSpeed: 2 + Math.random() * 4,
      opacity: 0.6 + Math.random() * 0.4,
      hue: 20 + Math.random() * 25, // 橙黄色调
    });
  }
  return leaves;
};

export default function Hero() {
  const [leaves] = useState(() => generateLeaves(20));
  const heroRef = useRef(null);
  const bgRef = useRef(null);
  const contentRef = useRef(null);
  const prefersReduced = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  // 滚动时 Hero 背景虚化过渡：与下一屏柔和交融，不硬切
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking || !heroRef.current) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = heroRef.current.getBoundingClientRect();
        const vh = window.innerHeight;
        // Hero 底部滚出视口的比例：0 = 完全在视口内，1 = 完全滚出
        const progress = Math.min(1, Math.max(0, -rect.bottom / vh + 1));
        // 背景虚化 + 微缩放 + 半透明
        if (bgRef.current) {
          bgRef.current.style.filter = `blur(${progress * 14}px)`;
          bgRef.current.style.transform = `scale(${1 + progress * 0.06})`;
          bgRef.current.style.opacity = 1 - progress * 0.6;
        }
        // 前景内容同步渐隐
        if (contentRef.current) {
          contentRef.current.style.opacity = 1 - progress * 0.8;
          contentRef.current.style.transform = `translateY(${progress * 30}px)`;
        }
        ticking = false;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="top" className="hero" ref={heroRef}>
      {/* 涂鸦毛边 SVG 滤镜 */}
      <svg className="hero__svg-filters" aria-hidden="true" width="0" height="0">
        <defs>
          <filter id="graffiti-rough">
            <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="graffiti-rough-chroma">
            <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="2" seed="7" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="B" />
          </filter>
        </defs>
      </svg>
      {/* 背景 */}
      <div className="hero__bg" ref={bgRef}>
        {/* 兜底插画：视频加载前显示 */}
        <img
          src="/spark/app/app_17gjhg4uphf/runtime/api/v1/storage/object/bucket_aadk3ildrlsew_static/static%2Faadk3mlomyypo_ve_miaoda"
          alt="赛博朋克紫发角色背景"
          className="hero__bg-img"
        />
        {/* 视频背景 */}
        <video
          className="hero__bg-video"
          autoPlay
          muted
          loop
          playsInline
          poster="/spark/app/app_17gjhg4uphf/runtime/api/v1/storage/object/bucket_aadk3ildrlsew_static/static%2Faadk3mlomyypo_ve_miaoda"
        >
          <source src="assets/hero-bg.mp4" type="video/mp4" />
        </video>
        {/* 白色磨砂蒙层 */}
        <div className="hero__bg-frost"></div>
        <div className="hero__bg-overlay"></div>
        <div className="hero__vignette"></div>
      </div>

      {/* 飘落秋叶粒子 */}
      {!prefersReduced && (
        <div className="hero__leaves" aria-hidden="true">
          {leaves.map((leaf) => (
            <div
              key={leaf.id}
              className="hero__leaf"
              style={{
                left: `${leaf.left}%`,
                width: `${leaf.size}px`,
                height: `${leaf.size}px`,
                animationDelay: `${leaf.delay}s`,
                animationDuration: `${leaf.duration}s`,
                '--sway-amp': `${leaf.swayAmp}px`,
                '--rot-speed': `${leaf.rotationSpeed}s`,
                opacity: leaf.opacity,
              }}
            >
              <svg viewBox="0 0 40 40" fill="none" style={{ filter: `hue-rotate(${leaf.hue}deg)` }}>
                <path
                  d="M20 2C20 2 8 12 8 22C8 30 14 38 20 38C26 38 32 30 32 22C32 12 20 2 20 2Z"
                  fill="#d48b3a"
                  fillOpacity="0.85"
                />
                <path
                  d="M20 6L20 36"
                  stroke="#b8732a"
                  strokeWidth="1.5"
                  strokeOpacity="0.6"
                />
                <path
                  d="M20 14L14 10M20 20L12 16M20 26L14 24M20 14L26 10M20 20L28 16M20 26L26 24"
                  stroke="#b8732a"
                  strokeWidth="1"
                  strokeOpacity="0.5"
                />
              </svg>
            </div>
          ))}
        </div>
      )}

      {/* 前景内容 */}
      <div className="container hero__content" ref={contentRef}>
        <div className="hero__meta">
          <span className="hero__meta-dot"></span>
          <span className="mono">PORTFOLIO / 2025</span>
        </div>

        <h1 className="hero__title">
          {/* 第一行：LUO LIANGLU 品牌大写名 */}
          <span className="hero__title-line hero__title-line--brand">
            <span className="hero__title-inner hero__title-inner--brand" data-text="电商作品集">电商作品集</span>
          </span>
          {/* 第二行：PORTFOLIO + 签名 */}
          <span className="hero__title-line hero__title-line--portfolio">
            <span className="hero__title-inner hero__title-inner--portfolio">
              PORTFOLIO
              <span className="hero__title-signature">{profile.nameEn}</span>
            </span>
          </span>
        </h1>

        <div className="hero__subtitle">
          <p className="hero__subtitle-text">
            电商视觉 × AI 创意流
            <br />
            用视觉，放大产品的吸引力
          </p>
        </div>

        <div className="hero__bottom">
          <a
            href="#workwall"
            className="hero__scroll"
            onClick={(e) => handleAnchorClick(e)}
          >
            <span className="mono">SCROLL</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </a>

          <div className="hero__location mono">
            <span className="hero__location-dot"></span>
            GUANGZHOU · CN
          </div>
        </div>
      </div>
    </section>
  );
}
