import { useState } from 'react';
import { advantages } from '../data/portfolio.js';
import { useReveal } from '../hooks/useReveal.js';
import { useTilt } from '../hooks/useTilt.js';
import './Advantages.css';

// 简单的 SVG 图标
const icons = {
  grid: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  ),
  shape: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v18M3 12h18" />
    </svg>
  ),
  spark: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10L12 2Z" />
    </svg>
  ),
  camera: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  ),
  pen: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  ),
};

function TiltAdvCard({ adv, index }) {
  const tiltRef = useTilt({ max: 4, scale: 1.08, speed: 0.55 });
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={tiltRef}
      className="adv-card"
      style={{
        '--stagger-delay': `${0.05 + index * 0.1}s`,
        '--card-accent': adv.accent,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* 背景渐变光斑 */}
      <div
        className="adv-card__glow"
        style={{ background: `radial-gradient(circle at 70% 20%, ${adv.accent}22 0%, transparent 60%)` }}
      ></div>

      {/* 扫描线 */}
      <div className="adv-card__scanline"></div>

      <div className="adv-card__corner adv-card__corner--tl"></div>
      <div className="adv-card__corner adv-card__corner--tr"></div>
      <div className="adv-card__corner adv-card__corner--bl"></div>
      <div className="adv-card__corner adv-card__corner--br"></div>
      <div className="adv-card__shine"></div>

      <div className="adv-card__head">
        <div className="adv-card__head-left">
          <span className="adv-card__num mono">0{index + 1}</span>
          {/* 状态指示灯 */}
          <div className="adv-card__status">
            <span className="adv-card__status-dot" style={{ background: adv.accent }}></span>
            <span className="adv-card__status-text mono">ACTIVE</span>
          </div>
        </div>
        <div className="adv-card__icon" style={{ color: adv.accent, borderColor: `${adv.accent}33` }}>
          {icons[adv.icon]}
        </div>
      </div>

      <div className="adv-card__body">
        <span className="adv-card__subtitle mono" style={{ color: adv.accent, textShadow: `0 0 10px ${adv.accent}55` }}>
          {adv.subtitle}
        </span>
        <h3 className="adv-card__title">{adv.title}</h3>
        <p className="adv-card__desc">{adv.description}</p>
      </div>

      {/* 能力值条形图 */}
      {adv.stats && (
        <div className="adv-card__stats">
          {adv.stats.map((stat, i) => (
            <div key={i} className="adv-card__stat-row">
              <span className="adv-card__stat-label mono">{stat.label}</span>
              <div className="adv-card__stat-bar">
                <div
                  className="adv-card__stat-bar-fill"
                  style={{
                    width: hovered ? `${stat.value}%` : '0%',
                    background: `linear-gradient(90deg, ${adv.accent}, ${adv.accent}88)`,
                    boxShadow: `0 0 8px ${adv.accent}88`,
                  }}
                ></div>
              </div>
              <span className="adv-card__stat-value mono">{stat.value}</span>
            </div>
          ))}
        </div>
      )}

      <div className="adv-card__footer">
        <span className="adv-card__line" style={{ background: hovered ? `linear-gradient(90deg, ${adv.accent}, transparent)` : '' }}></span>
        <span className="adv-card__more" style={{ color: hovered ? adv.accent : '' }}>EXPLORE</span>
      </div>
    </div>
  );
}

export default function Advantages() {
  const [headingRef, headingRevealed] = useReveal({ threshold: 0.2 });
  const [gridRef, gridRevealed] = useReveal({ threshold: 0.1 });

  return (
    <section id="advantages" className="section advantages">
      {/* 背景装饰 */}
      <div className="advantages__bg-decor" aria-hidden="true">
        <div className="advantages__grid-lines"></div>
        <div className="advantages__bg-glow advantages__bg-glow--1"></div>
        <div className="advantages__bg-glow advantages__bg-glow--2"></div>
        <div className="advantages__bg-glow advantages__bg-glow--3"></div>
      </div>

      <div className="container">
        <div
          className={`advantages__header reveal-heading ${headingRevealed ? 'is-revealed' : ''}`}
          ref={headingRef}
        >
          <span className="section-label">03 / CAPABILITIES</span>
          <div className="advantages__header-inner">
            <h2 className="section-heading">
              全链路视觉<br />
              <span className="accent">一站式输出</span>
            </h2>
            <p className="advantages__subtitle">
              平面 · AI 生成。多技能矩阵交叉赋能，一个人就是一支团队。
            </p>
          </div>
        </div>

        <div
          className={`advantages__grid reveal-stagger ${gridRevealed ? 'is-revealed' : ''}`}
          ref={gridRef}
        >
          {advantages.map((adv, index) => (
            <TiltAdvCard key={adv.id} adv={adv} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
