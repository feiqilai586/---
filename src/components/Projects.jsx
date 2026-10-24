import { useState, useEffect, useCallback, useRef } from 'react';
import { projects } from '../data/portfolio.js';
import { useReveal } from '../hooks/useReveal.js';
import { useTilt } from '../hooks/useTilt.js';
import './Projects.css';

// ========== 详情图查看器：滚轮缩放 + 拖动平移 + 双击重置 ==========
function DetailViewer({ images, accent }) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dragState = useRef({
    dragging: false, startX: 0, startY: 0, startPosX: 0, startPosY: 0,
  });

  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [images]);

  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.15 : 0.15;
    setScale((s) => Math.min(4, Math.max(1, +(s + delta).toFixed(2))));
  }, []);

  const handlePointerDown = useCallback((e) => {
    if (scale <= 1) return;
    dragState.current = {
      dragging: true,
      startX: e.clientX,
      startY: e.clientY,
      startPosX: position.x,
      startPosY: position.y,
    };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  }, [scale, position]);

  const handlePointerMove = useCallback((e) => {
    if (!dragState.current.dragging) return;
    const dx = e.clientX - dragState.current.startX;
    const dy = e.clientY - dragState.current.startY;
    setPosition({
      x: dragState.current.startPosX + dx,
      y: dragState.current.startPosY + dy,
    });
  }, []);

  const handlePointerUp = useCallback(() => {
    dragState.current.dragging = false;
  }, []);

  const handleDoubleClick = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  return (
    <div
      className="p-detail-viewer"
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onDoubleClick={handleDoubleClick}
      style={{ '--accent': accent }}
    >
      <div className="p-detail-viewer__hint mono">
        滚轮缩放 · 拖动平移 · 双击重置
      </div>
      <div
        className="p-detail-viewer__inner"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
        }}
      >
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`detail-${i + 1}`}
            className="p-detail-viewer__img"
            draggable={false}
          />
        ))}
      </div>
      <div className="p-detail-viewer__scale mono">{Math.round(scale * 100)}%</div>
    </div>
  );
}

export default function Projects() {
  const [headingRef, headingRevealed] = useReveal({ threshold: 0.2 });
  const [modalOpen, setModalOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);

  const openModal = useCallback((project) => {
    setActiveProject(project);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    document.body.style.overflow = '';
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && modalOpen) closeModal();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [modalOpen, closeModal]);

  return (
    <section id="projects" className="section projects">
      <div className="perspective-grid">
        <div className="fade-mask"></div>
      </div>

      <div className="container">
        <div
          className={`projects__header reveal-heading ${headingRevealed ? 'is-revealed' : ''}`}
          ref={headingRef}
        >
          <span className="section-label">02 / SELECTED WORK</span>
          <div className="projects__header-inner">
            <h2 className="section-heading">精选案例</h2>
            <p className="projects__subtitle">
              详情构思 → 视觉落地 → 数据验证。
              <br />
              每一个项目都是一次品牌升维实验。
            </p>
          </div>
        </div>

        <div className="projects__list">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onView={openModal}
            />
          ))}
        </div>
      </div>

      {/* 项目详情弹层 */}
      {modalOpen && activeProject && (
        <div className="project-modal" onClick={closeModal}>
          <div className="project-modal__backdrop"></div>
          <div
            className="project-modal__content project-modal__content--v2"
            onClick={(e) => e.stopPropagation()}
            style={{ '--accent': activeProject.accent }}
          >
            <button className="project-modal__close" onClick={closeModal}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* ===== 主图区 MAIN VISUAL ===== */}
            <div className="p-modal-section p-modal-section--hero">
              <div className="p-modal-section__label">
                <span className="mono">01 / MAIN VISUAL</span>
                <span className="p-modal-section__label-cn">主图</span>
              </div>
              <div className="p-modal-hero">
                <img
                  src={activeProject.heroImage || activeProject.image}
                  alt={activeProject.name}
                  className="p-modal-hero__img"
                />
                <div className="p-modal-hero__overlay"></div>
                <div className="p-modal-hero__info">
                  <span className="p-modal-hero__tag mono">
                    {String(projects.findIndex(p => p.id === activeProject.id) + 1).padStart(2, '0')} / {activeProject.tag}
                  </span>
                  <h2 className="p-modal-hero__title">{activeProject.name}</h2>
                  <p className="p-modal-hero__category">{activeProject.category}</p>
                  <p className="p-modal-hero__desc">{activeProject.description}</p>
                </div>
              </div>
            </div>

            {/* ===== 详情区 DETAILS ===== */}
            <div className="p-modal-section p-modal-section--details">
              <div className="p-modal-section__label">
                <span className="mono">02 / DETAILS</span>
                <span className="p-modal-section__label-cn">详情页视觉</span>
              </div>
              {activeProject.detailImages && activeProject.detailImages.length > 0 ? (
                <DetailViewer images={activeProject.detailImages} accent={activeProject.accent} />
              ) : (
                <div className="p-modal-detail-placeholder mono">
                  详情页视觉整理中，敬请期待
                </div>
              )}
            </div>

            {/* ===== 负责内容 SCOPE ===== */}
            <div className="p-modal-section p-modal-section--scope">
              <div className="p-modal-section__label">
                <span className="mono">03 / SCOPE OF WORK</span>
                <span className="p-modal-section__label-cn">负责内容</span>
              </div>
              <ul className="p-modal-scope__list">
                {activeProject.responsibilities && activeProject.responsibilities.map((item, i) => (
                  <li key={i}>
                    <span
                      className="p-modal-scope__dot"
                      style={{ background: activeProject.accent }}
                    ></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function ProjectCard({ project, index, onView }) {
  const [cardRef, cardRevealed] = useReveal({ threshold: 0.15 });
  const tiltRef = useTilt({ max: 4, scale: 1.02, speed: 0.35 });
  const isLeft = index % 2 === 0;

  return (
    <article
      ref={cardRef}
      className={`project-card project-card--${isLeft ? 'left' : 'right'} reveal ${cardRevealed ? 'is-revealed' : ''}`}
      style={{
        '--accent': project.accent,
        transitionDelay: '0s',
      }}
    >
      <div className={`project-card__visual reveal-img ${cardRevealed ? 'is-revealed' : ''}`}>
        <div
          ref={tiltRef}
          className="project-card__image-wrap"
          onClick={() => onView(project)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onView(project);
            }
          }}
        >
          <img
            src={project.image}
            alt={project.name}
            className="project-card__image"
          />
          <div className="project-card__image-overlay"></div>
          <div className="project-card__shine"></div>
          <div className="project-card__view-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span className="mono">VIEW CASE</span>
          </div>
        </div>
        <div className="project-card__number mono">
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>

      <div className="project-card__info">
        <div className="project-card__tags">
          <span className="project-card__tag">{project.tag}</span>
          <span className="project-card__category">{project.category}</span>
        </div>

        <h3 className="project-card__title">{project.name}</h3>

        <p className="project-card__desc">{project.description}</p>

        <div className="project-card__responsibilities">
          <h4 className="project-card__resp-title">
            <span className="mono">SCOPE</span>
            负责内容
          </h4>
          <ul className="project-card__resp-list">
            {project.responsibilities.map((item, i) => (
              <li key={i}>
                <span className="project-card__resp-mark"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="project-card__footer">
          <button className="project-card__view-btn" onClick={() => onView(project)}>
            <span>查看案例</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M7 17L17 7M17 7H8M17 7v9" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}
