import { contact, profile } from '../data/portfolio.js';
import { useReveal } from '../hooks/useReveal.js';
import { useMagnetic } from '../hooks/useTilt.js';
import { handleAnchorClick } from '../utils/scroll.js';
import './Contact.css';

function MagneticButton() {
  const magRef = useMagnetic({ strength: 0.25, speed: 0.5 });
  return (
    <a
      ref={magRef}
      href="#top"
      className="contact__hook-btn"
      onClick={(e) => handleAnchorClick(e)}
    >
      <span>回到顶部</span>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </a>
  );
}

export default function Contact() {
  const [titleRef, titleRevealed] = useReveal({ threshold: 0.2 });
  const [hookRef, hookRevealed] = useReveal({ threshold: 0.15 });
  const [cardsRef, cardsRevealed] = useReveal({ threshold: 0.15 });

  return (
    <section id="contact" className="section contact">
      {/* 背景装饰 */}
      <div className="contact__bg">
        <div className="contact__clouds"></div>
        <div className="contact__glow"></div>
      </div>

      <div className="container contact__container">
        <div className="contact__top">
          <span className="section-label">04 / GET IN TOUCH</span>
        </div>

        <div
          className={`contact__main reveal-heading ${titleRevealed ? 'is-revealed' : ''}`}
          ref={titleRef}
        >
          <h2 className="contact__title">
            <span className="contact__title-line contact__title-line--strong">
              有想法？
            </span>
            <span className="contact__title-line">
              <span className="accent">直接开聊！</span>
            </span>
          </h2>

          <p className="contact__desc">
            品牌升级 / 电商视觉 / AI 创意项目合作，
            <br />
            或者单纯想交流设计——都欢迎。
          </p>
        </div>

        <div
          className={`contact__cards reveal-stagger ${cardsRevealed ? 'is-revealed' : ''}`}
          ref={cardsRef}
        >
          <a
            href={`tel:${contact.phone}`}
            className="contact-card"
            style={{ '--stagger-delay': '0s' }}
          >
            <div className="contact-card__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
            </div>
            <div className="contact-card__label">PHONE / 电话</div>
            <div className="contact-card__value">{contact.phone}</div>
            <div className="contact-card__hint">微信同号</div>
          </a>

          <a
            href={`mailto:${contact.email}`}
            className="contact-card"
            style={{ '--stagger-delay': '0.1s' }}
          >
            <div className="contact-card__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <div className="contact-card__label">EMAIL / 邮箱</div>
            <div className="contact-card__value">{contact.email}</div>
            <div className="contact-card__hint">24小时内回复</div>
          </a>

          <div
            className="contact-card"
            style={{ '--stagger-delay': '0.2s' }}
            role="group"
            aria-label="微信联系方式"
          >
            <div className="contact-card__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
            </div>
            <div className="contact-card__label">WECHAT / 微信</div>
            <div className="contact-card__value">{contact.wechat}</div>
            <div className="contact-card__hint">添加请备注来意</div>
          </div>
        </div>

        {/* 收尾钩子：你还在投PDF简历？ */}
        <div
          className={`contact__hook reveal-heading ${hookRevealed ? 'is-revealed' : ''}`}
          ref={hookRef}
        >
          {/* 涂鸦毛边 SVG 滤镜（复用 Hero 同款） */}
          <svg className="contact__svg-filters" aria-hidden="true" width="0" height="0">
            <defs>
              <filter id="contact-glitch-rough">
                <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="3" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" />
              </filter>
              <filter id="contact-glitch-rough-chroma">
                <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="2" seed="7" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="B" />
              </filter>
            </defs>
          </svg>

          <h3 className="contact__hook-title">
            <span className="contact__hook-line">
              <span className="contact__hook-inner" data-text="作品集看到这">作品集看到这</span>
            </span>
            <span className="contact__hook-line contact__hook-line--accent">
              <span className="contact__hook-inner contact__hook-inner--accent" data-text="我们该聊聊了">我们该聊聊了</span>
            </span>
          </h3>
          <MagneticButton />
        </div>

        {/* 底部 */}
        <footer className="contact__footer">
          <div className="contact__footer-left">
            <span className="contact__footer-logo mono">LUO LIANGLU · VISUAL DESIGN</span>
            <span className="contact__footer-copy">© 2026 {profile.name} · All Rights Reserved</span>
          </div>
          <div className="contact__footer-right mono">
            <span>BASED IN GUANGZHOU</span>
            <span className="contact__footer-dot">·</span>
            <span>DESIGNED & BUILT WITH CARE</span>
          </div>
        </footer>
      </div>
    </section>
  );
}
