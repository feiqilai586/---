import { profile, basicInfo, contact, stats, experience, skills } from '../data/portfolio.js';
import { useReveal } from '../hooks/useReveal.js';
import './About.css';

// 软件/工具图标 — 简约风格 SVG，按品牌色取色
const skillIcons = {
  'Photoshop': (
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#001E36" />
      <text x="12" y="17" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="11" fill="#31A8FF">Ps</text>
    </svg>
  ),
  'Illustrator': (
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#330000" />
      <text x="12" y="17" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="11" fill="#FF9A00">Ai</text>
    </svg>
  ),
  'Blender': (
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#EA7600" />
      <circle cx="12" cy="11" r="3.5" fill="#fff" opacity="0.9" />
      <circle cx="6" cy="12" r="1.5" fill="#fff" />
      <circle cx="18" cy="12" r="1.5" fill="#fff" />
      <circle cx="9" cy="17" r="1.5" fill="#fff" />
      <circle cx="15" cy="17" r="1.5" fill="#fff" />
      <path d="M6 12 L9 17 M18 12 L15 17 M6 12 L9 10.5 M18 12 L15 10.5" stroke="#fff" strokeWidth="0.8" />
    </svg>
  ),
  '豆包': (
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#3370FF" />
      <path d="M8 9c0-2.2 1.8-4 4-4s4 1.8 4 4v1c0 .6-.4 1-1 1s-1-.4-1-1V9c0-1.1-.9-2-2-2s-2 .9-2 2v1c0 .6-.4 1-1 1s-1-.4-1-1V9z" fill="#fff" />
      <ellipse cx="12" cy="16" rx="4" ry="1.5" fill="#fff" />
    </svg>
  ),
  '剪映': (
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#0A0A0A" />
      <path d="M7 7 L12 12 L7 17z" fill="#FE2C55" />
      <path d="M17 7 L12 12 L17 17z" fill="#25F4EE" />
    </svg>
  ),
  'ChatGPT': (
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#1A1A1A" />
      <path d="M12 6 L14 7 L16 6 L17 8 L19 9 L18 11 L19 13 L17 14 L16 16 L14 15 L12 16 L11 14 L9 15 L8 13 L6 12 L7 10 L6 8 L8 7 L9 6 L11 7 Z" stroke="#10A37F" strokeWidth="1" fill="none" />
    </svg>
  ),
  'Stable Diffusion': (
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#1a1a2e" />
      <path d="M7 12 Q9 6 12 8 Q15 10 17 12 Q15 14 12 16 Q9 18 7 12Z" fill="url(#sdGrad)" />
      <defs>
        <linearGradient id="sdGrad" x1="7" y1="6" x2="17" y2="18" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="50%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
    </svg>
  ),
  '即梦': (
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#12101d" />
      <path d="M12 6 L14 10 L18 10 L15 13 L16 18 L12 15 L8 18 L9 13 L6 10 L10 10 Z" fill="#a855f7" />
    </svg>
  ),
};

export default function About() {
  const [headingRef, headingRevealed] = useReveal({ threshold: 0.2 });
  const [leftRef, leftRevealed] = useReveal({ threshold: 0.15 });
  const [rightRef, rightRevealed] = useReveal({ threshold: 0.15 });

  return (
    <section id="about" className="section about">
      <div className="container">
        <div
          className={`about__header reveal-heading ${headingRevealed ? 'is-revealed' : ''}`}
          ref={headingRef}
        >
          <span className="section-label">01 / ABOUT</span>
          <h2 className="section-heading about__heading">
            <span className="accent">视觉设计师</span><br />
            用像素重塑品牌叙事。
          </h2>
        </div>

        <div className="about__grid">
          {/* 左侧：信息 */}
          <div className={`about__left reveal reveal--left ${leftRevealed ? 'is-revealed' : ''}`} ref={leftRef}>
            {/* 基础信息 */}
            <div className="about__info-block">
              <h4 className="about__info-title">
                <span className="mono">INFO</span>
                基础信息
              </h4>
              <ul className="about__info-list">
                <li>
                  <span className="about__info-key">姓名</span>
                  <span className="about__info-value">{profile.name} · {profile.nameEn}</span>
                </li>
                <li>
                  <span className="about__info-key">性别 / 年龄</span>
                  <span className="about__info-value">{basicInfo.gender} · {basicInfo.age}岁</span>
                </li>
                <li>
                  <span className="about__info-key">籍贯 / 现居</span>
                  <span className="about__info-value">{basicInfo.hometown} · {basicInfo.location}</span>
                </li>
                <li>
                  <span className="about__info-key">学历</span>
                  <span className="about__info-value">{basicInfo.education} · {basicInfo.school}</span>
                </li>
              </ul>
            </div>

            {/* 联系方式 */}
            <div className="about__info-block">
              <h4 className="about__info-title">
                <span className="mono">CONTACT</span>
                联系方式
              </h4>
              <ul className="about__contact-list">
                <li>
                  <span className="about__contact-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  </span>
                  <div>
                    <span className="about__contact-label">电话</span>
                    <a href={`tel:${contact.phone}`} className="about__contact-value">
                      {contact.phone}
                    </a>
                  </div>
                </li>
                <li>
                  <span className="about__contact-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </span>
                  <div>
                    <span className="about__contact-label">邮箱</span>
                    <a href={`mailto:${contact.email}`} className="about__contact-value">
                      {contact.email}
                    </a>
                  </div>
                </li>
                <li>
                  <span className="about__contact-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                    </svg>
                  </span>
                  <div>
                    <span className="about__contact-label">微信</span>
                    <span className="about__contact-value">{contact.wechat}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* 右侧：经历 + 数据 + 技能 */}
          <div
            className={`about__right reveal reveal--right ${rightRevealed ? 'is-revealed' : ''}`}
            ref={rightRef}
          >
            {/* 个人简介 */}
            <div className="about__intro">
              <p className="about__intro-text">
                专攻电商视觉 × AI 创意流。
                从品牌定位到视觉落地，用系统化设计语言放大产品价值——
                主 KV、详情页、动态视觉、AI 生成全链路覆盖。
              </p>
            </div>

            {/* 数据统计 — stagger 依次出现 */}
            <div
              className={`about__stats reveal-stagger ${rightRevealed ? 'is-revealed' : ''}`}
            >
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="about__stat"
                  style={{ '--stagger-delay': `${0.1 + index * 0.1}s` }}
                >
                  <div className="about__stat-num">
                    {stat.value}
                    {stat.suffix && <span className="about__stat-suffix">{stat.suffix}</span>}
                  </div>
                  <div className="about__stat-label">{stat.label}</div>
                  <div className="about__stat-line"></div>
                </div>
              ))}
            </div>

            {/* 工作经历 */}
            <div className="about__experience">
              <h4 className="about__info-title">
                <span className="mono">EXPERIENCE</span>
                工作经历
              </h4>
              <div className="about__exp-card">
                <div className="about__exp-header">
                  <div>
                    <h5 className="about__exp-company">{experience.company}</h5>
                    <p className="about__exp-role">{profile.title}</p>
                  </div>
                  <span className="about__exp-period mono">{experience.period}</span>
                </div>
                <ul className="about__exp-list">
                  {experience.description.map((item, i) => (
                    <li key={i}>
                      <span className="about__exp-bullet"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 专业技能 */}
            <div className="about__skills">
              <h4 className="about__info-title">
                <span className="mono">TOOLS & SKILLS</span>
                专业技能
              </h4>
              <div className="about__skill-tags">
                {skills.map((skill) => (
                  <span key={skill} className="about__skill-tag">
                    <span className="about__skill-tag-icon">
                      {skillIcons[skill] || null}
                    </span>
                    <span className="about__skill-tag-label">{skill}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
