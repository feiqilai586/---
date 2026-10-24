import { useState, useRef, useEffect, useCallback } from 'react';
import { projects } from '../data/portfolio.js';
import './WorkWall.css';

// ========== 详情图查看器：支持滚轮缩放 + 拖动平移 ==========
function DetailViewer({ images, accent }) {
  const viewportRef = useRef(null);
  const imgRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dragState = useRef({ dragging: false, startX: 0, startY: 0, startPosX: 0, startPosY: 0 });

  // 重置
  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [images]);

  // 滚轮缩放
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.15 : 0.15;
    setScale((s) => Math.min(4, Math.max(1, +(s + delta).toFixed(2))));
  }, []);

  // 拖动平移（仅在放大时）
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

  // 双击重置
  const handleDoubleClick = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  return (
    <div
      className="detail-viewer"
      ref={viewportRef}
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onDoubleClick={handleDoubleClick}
      style={{ '--accent': accent }}
    >
      <div className="detail-viewer__hint mono">
        滚轮缩放 · 拖动平移 · 双击重置
      </div>
      <div
        className="detail-viewer__inner"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
        }}
      >
        {images.map((img, i) => (
          <img
            key={i}
            ref={i === 0 ? imgRef : null}
            src={img}
            alt={`detail-${i + 1}`}
            className="detail-viewer__img"
            draggable={false}
          />
        ))}
      </div>
      <div className="detail-viewer__scale mono">{Math.round(scale * 100)}%</div>
    </div>
  );
}


// 10 个彩色梦幻占位图
const placeholderImages = [
  '/spark/app/app_17gjhg4uphf/runtime/api/v1/storage/object/bucket_aadk3ildrlsew_static/static%2Faadk3kwqkmybq_ve_miaoda',
  '/spark/app/app_17gjhg4uphf/runtime/api/v1/storage/object/bucket_aadk3ildrlsew_static/static%2Faadk3ksccyofg_ve_miaoda',
  '/spark/app/app_17gjhg4uphf/runtime/api/v1/storage/object/bucket_aadk3ildrlsew_static/static%2Faadk3jfe7zygg_ve_miaoda',
  '/spark/app/app_17gjhg4uphf/runtime/api/v1/storage/object/bucket_aadk3ildrlsew_static/static%2Faadk3ku5gbsdi_ve_miaoda',
  '/spark/app/app_17gjhg4uphf/runtime/api/v1/storage/object/bucket_aadk3ildrlsew_static/static%2Faadk3jg754yfg_ve_miaoda',
  '/spark/app/app_17gjhg4uphf/runtime/api/v1/storage/object/bucket_aadk3ildrlsew_static/static%2Faadk3jg754yeg_ve_miaoda',
  '/spark/app/app_17gjhg4uphf/runtime/api/v1/storage/object/bucket_aadk3ildrlsew_static/static%2Faadk3ktyg6gig_ve_miaoda',
  '/spark/app/app_17gjhg4uphf/runtime/api/v1/storage/object/bucket_aadk3ildrlsew_static/static%2Faadk3jmu5pacg_ve_miaoda',
  '/spark/app/app_17gjhg4uphf/runtime/api/v1/storage/object/bucket_aadk3ildrlsew_static/static%2Faadk3jbmxmohg_ve_miaoda',
  '/spark/app/app_17gjhg4uphf/runtime/api/v1/storage/object/bucket_aadk3ildrlsew_static/static%2Faadk3kujja2dq_ve_miaoda',
];

// 构建 12 个方块数据：前 2 个为真实项目，后 10 个为占位
const buildWorks = () => {
  const works = [];
  projects.forEach((p, i) => {
    works.push({
      id: p.id,
      number: String(i + 1).padStart(2, '0'),
      title: p.name,
      category: p.category,
      tag: p.tag,
      description: p.description,
      responsibilities: p.responsibilities,
      image: p.image,
      heroImage: p.heroImage || p.image,
      detailImages: p.detailImages || [p.image],
      accent: p.accent,
      real: true,
    });
  });
  for (let i = 0; i < 10; i++) {
    works.push({
      id: `placeholder-${i}`,
      number: String(projects.length + i + 1).padStart(2, '0'),
      title: '作品整理中',
      category: 'Coming Soon',
      tag: 'UPCOMING',
      description: '更多作品正在整理中，后续将陆续替换为真实项目案例。',
      responsibilities: [],
      image: placeholderImages[i],
      heroImage: placeholderImages[i],
      detailImages: [placeholderImages[i]],
      accent: '#d48b3a',
      real: false,
    });
  }
  return works;
};

// 拖拽位移超过此值视为拖拽（不触发点击）
const DRAG_THRESHOLD = 6;
// 自动滚动速度（px/秒，向左为负）
const AUTO_SCROLL_SPEED = -32;
// 惯性衰减系数（每秒衰减到原有速度的比例）
const INERTIA_DECAY = 0.92;
// 恢复自动滚动时的缓动时长（毫秒）
const EASE_BACK_DURATION = 800;

export default function WorkWall() {
  const works = buildWorks();
  const [modalOpen, setModalOpen] = useState(false);
  const [activeWork, setActiveWork] = useState(null);
  const trackRef = useRef(null);
  const wallRef = useRef(null);

  // 动画 / 滚动状态
  const scrollState = useRef({
    // 当前 translateX 位置（px，负值 = 向左滚）
    x: 0,
    // 目标/当前速度（px/秒，惯性阶段用）
    velocity: 0,
    // 半宽（无缝循环的折返点），初始化时计算
    halfWidth: 0,
    // 自动滚动是否启用
    autoScroll: true,
    // 阶段：'auto' | 'drag' | 'inertia' | 'easing-back'
    phase: 'auto',
    // easing-back 开始时间与起始 x
    easeStartX: 0,
    easeStartTime: 0,
    // 上一帧时间
    lastTime: 0,
    // rAF id
    rafId: null,
    // 减少动效偏好
    reducedMotion: false,
  });

  // 拖拽状态
  const dragState = useRef({
    isDragging: false,
    pointerId: null,
    startX: 0,
    startY: 0,
    startScrollX: 0,
    moved: false,
    lastX: 0,
    lastTime: 0,
    // 用于速度采样（多帧平均更平滑）
    velocitySamples: [],
  });

  const [isDragging, setIsDragging] = useState(false);

  // 应用 transform
  const applyTransform = useCallback(() => {
    if (!trackRef.current) return;
    let x = scrollState.current.x;
    const half = scrollState.current.halfWidth;
    // 无缝循环：向左滚到 -half 时重置为 0（内容重复了一份）
    if (half > 0) {
      x = ((x % half) + half) % half;
      if (x > 0) x -= half; // 保持在 [-half, 0]
    }
    scrollState.current.x = x;
    trackRef.current.style.transform = `translate3d(${x}px, 0, 0)`;
  }, []);

  // 主动画循环
  const tick = useCallback((time) => {
    const s = scrollState.current;
    const dt = Math.min((time - s.lastTime) / 1000, 0.05); // 上限 50ms
    s.lastTime = time;

    if (s.reducedMotion) {
      s.rafId = requestAnimationFrame(tick);
      return;
    }

    switch (s.phase) {
      case 'auto':
        // 匀速自动滚动
        s.x += AUTO_SCROLL_SPEED * dt;
        break;

      case 'drag':
        // 拖拽由 pointermove 直接写 x，这里只推进时间
        break;

      case 'hover-paused':
        // hover 时减速暂停：x 不动，但仍推进 lastTime 避免离开后 dt 过大
        break;

      case 'inertia': {
        // 惯性缓停
        s.x += s.velocity * dt;
        // 指数衰减
        const decay = Math.pow(INERTIA_DECAY, dt * 60);
        s.velocity *= decay;
        // 速度足够小 → 进入缓动恢复阶段
        if (Math.abs(s.velocity) < 5) {
          s.phase = 'easing-back';
          s.easeStartX = s.x;
          s.easeStartTime = time;
        }
        break;
      }

      case 'easing-back': {
        // 从惯性末位置平滑过渡回正常自动滚动节奏
        const elapsed = time - s.easeStartTime;
        const p = Math.min(elapsed / EASE_BACK_DURATION, 1);
        // easeOutCubic
        const eased = 1 - Math.pow(1 - p, 3);
        // 目标位置 = 起始位置 + 自动滚动在该时段内走过的距离
        const targetDelta = AUTO_SCROLL_SPEED * (elapsed / 1000);
        s.x = s.easeStartX + targetDelta * eased + (1 - eased) * 0;
        // 修正：更自然的做法是 x 从 easeStartX 逐渐加入 auto-scroll 速度
        // 用 eased 作为权重：x = easeStartX + autoOffset * eased
        // 但 autoOffset 随时间增长，所以上式正确：p=0 时 x=startX，p=1 时 x=startX + autoOffset
        if (p >= 1) {
          s.phase = 'auto';
        }
        break;
      }

      default:
        break;
    }

    applyTransform();
    s.rafId = requestAnimationFrame(tick);
  }, [applyTransform]);

  // 计算半宽（内容复制了一份，所以轨道宽度 / 2 = 单组宽度）
  const measureHalfWidth = useCallback(() => {
    if (!trackRef.current) return;
    const w = trackRef.current.scrollWidth / 2;
    scrollState.current.halfWidth = w;
  }, []);

  // 初始化 & 启动循环
  useEffect(() => {
    const s = scrollState.current;
    // 读取减少动效偏好
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    s.reducedMotion = mql.matches;
    const handleMQ = (e) => {
      s.reducedMotion = e.matches;
    };
    mql.addEventListener?.('change', handleMQ);

    // 等待 DOM 渲染后测量
    requestAnimationFrame(() => {
      measureHalfWidth();
      s.lastTime = performance.now();
      s.rafId = requestAnimationFrame(tick);
    });

    // 窗口 resize 重新测量
    const handleResize = () => measureHalfWidth();
    window.addEventListener('resize', handleResize);

    return () => {
      if (s.rafId) cancelAnimationFrame(s.rafId);
      mql.removeEventListener?.('change', handleMQ);
      window.removeEventListener('resize', handleResize);
    };
  }, [tick, measureHalfWidth]);

  // ========== Pointer 拖拽 ==========

  const handlePointerDown = useCallback((e) => {
    // 只响应主按钮（左键 / 触摸 / 触控笔）
    if (e.button !== undefined && e.button !== 0) return;
    const ds = dragState.current;
    const ss = scrollState.current;

    ds.isDragging = true;
    ds.pointerId = e.pointerId;
    ds.startX = e.clientX;
    ds.startY = e.clientY;
    ds.startScrollX = ss.x;
    ds.moved = false;
    ds.lastX = e.clientX;
    ds.lastTime = performance.now();
    ds.velocitySamples = [];

    // 捕获指针，移出区域也不丢
    if (trackRef.current) {
      trackRef.current.setPointerCapture(e.pointerId);
    }

    ss.phase = 'drag';
    ss.velocity = 0;
    setIsDragging(true);
  }, []);

  const handlePointerMove = useCallback((e) => {
    const ds = dragState.current;
    if (!ds.isDragging || ds.pointerId !== e.pointerId) return;
    const ss = scrollState.current;

    const dx = e.clientX - ds.startX;
    const dy = e.clientY - ds.startY;

    // 超过阈值才算拖拽
    if (!ds.moved) {
      if (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD) {
        ds.moved = true;
      } else {
        return;
      }
    }

    // 只在水平为主时接管（避免纵向页面滚动被完全劫持）
    // 但这里是横向墙，一律按横向拖
    const now = performance.now();
    const dt = (now - ds.lastTime) / 1000;
    const frameDx = e.clientX - ds.lastX;

    // 速度采样（近 3 帧平均）
    if (dt > 0) {
      ds.velocitySamples.push(frameDx / dt);
      if (ds.velocitySamples.length > 3) ds.velocitySamples.shift();
    }

    ss.x = ds.startScrollX + dx;
    ds.lastX = e.clientX;
    ds.lastTime = now;
  }, []);

  const endDrag = useCallback((e) => {
    const ds = dragState.current;
    if (!ds.isDragging) return;
    if (ds.pointerId !== null && e?.pointerId !== undefined && ds.pointerId !== e.pointerId) return;

    const ss = scrollState.current;

    // 释放捕获
    if (trackRef.current && ds.pointerId !== null) {
      try {
        trackRef.current.releasePointerCapture(ds.pointerId);
      } catch (_) { /* noop */ }
    }

    if (ds.moved && ds.velocitySamples.length > 0) {
      // 计算平均初速度，进入惯性
      const avgV = ds.velocitySamples.reduce((a, b) => a + b, 0) / ds.velocitySamples.length;
      ss.velocity = avgV;
      ss.phase = 'inertia';
    } else {
      // 没怎么动 → 直接回到自动滚动
      ss.phase = 'easing-back';
      ss.easeStartX = ss.x;
      ss.easeStartTime = performance.now();
    }

    ds.isDragging = false;
    ds.pointerId = null;
    setIsDragging(false);

    // moved 标记延迟清空，防止 click 事件紧接着触发
    // (React onClick 会在 pointerup 之后同步触发，所以保留到下一个 tick)
    setTimeout(() => {
      ds.moved = false;
    }, 0);
  }, []);

  const handlePointerUp = useCallback((e) => {
    endDrag(e);
  }, [endDrag]);

  const handlePointerCancel = useCallback((e) => {
    endDrag(e);
  }, [endDrag]);

  // ========== 滚轮 ==========

  const handleWheel = useCallback((e) => {
    if (!trackRef.current) return;
    const ss = scrollState.current;

    // 纵向滚轮 → 横向滚动（方块墙区域内）
    const delta = e.deltaY !== 0 ? e.deltaY : e.deltaX;

    // 阻止页面滚动（只在方块墙内）
    e.preventDefault();

    ss.x -= delta;
    // 滚轮视为一次"手动操作"，给一个短暂的速度惯性
    ss.velocity = -delta / 0.016; // 近似瞬时速度
    ss.phase = 'inertia';

    applyTransform();
  }, [applyTransform]);

  // hover 暂停自动滚动
  const handleMouseEnter = useCallback(() => {
    const ss = scrollState.current;
    if (ss.phase === 'auto' && !ss.reducedMotion) {
      ss.phase = 'hover-paused';
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    const ss = scrollState.current;
    if (ss.phase === 'hover-paused') {
      // 从当前位置平滑过渡回自动滚动节奏
      ss.phase = 'easing-back';
      ss.easeStartX = ss.x;
      ss.easeStartTime = performance.now();
    }
  }, []);

  // ========== Modal ==========

  const openModal = useCallback((work) => {
    if (dragState.current.moved) return;
    setActiveWork(work);
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
    <section id="workwall" className="workwall" ref={wallRef}>
      <div
        className={`workwall__track ${isDragging ? 'is-dragging' : ''}`}
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onWheel={handleWheel}
      >
        {[...works, ...works].map((work, idx) => (
            <div
              key={`${work.id}-${idx}`}
              className="workwall__item"
              onClick={() => openModal(work)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openModal(work);
                }
              }}
            >
              <div className="workwall__item-inner">
                <img
                  src={work.image}
                  alt={work.title}
                  className="workwall__item-img"
                  loading="lazy"
                />
                <div className="workwall__item-overlay"></div>
                <div className="workwall__item-number mono">{work.number}</div>
                <div className="workwall__item-view">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  VIEW
                </div>
                <div className="workwall__item-hover">
                  <span className="workwall__item-category">{work.category}</span>
                  <span className="workwall__item-title">{work.title}</span>
                </div>
              </div>
          </div>
        ))}
      </div>

      {/* 作品详情弹层 */}
      {modalOpen && activeWork && (
        <div className="workwall__modal" onClick={closeModal}>
          <div className="workwall__modal-backdrop"></div>
          <div
            className="workwall__modal-content workwall__modal-content--v2"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="workwall__modal-close" onClick={closeModal}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* ===== 主图区 MAIN VISUAL ===== */}
            <div className="modal-section modal-section--hero" style={{ '--accent': activeWork.accent }}>
              <div className="modal-section__label">
                <span className="mono">01 / MAIN VISUAL</span>
                <span className="modal-section__label-cn">主图</span>
              </div>
              <div className="modal-hero">
                <img src={activeWork.heroImage} alt={activeWork.title} className="modal-hero__img" />
                <div className="modal-hero__overlay"></div>
                <div className="modal-hero__info">
                  <span className="modal-hero__number mono">{activeWork.number}</span>
                  <h2 className="modal-hero__title">{activeWork.title}</h2>
                  <p className="modal-hero__category">{activeWork.category}</p>
                  <p className="modal-hero__desc">{activeWork.description}</p>
                </div>
              </div>
            </div>

            {/* ===== 详情区 DETAILS ===== */}
            <div className="modal-section modal-section--details" style={{ '--accent': activeWork.accent }}>
              <div className="modal-section__label">
                <span className="mono">02 / DETAILS</span>
                <span className="modal-section__label-cn">详情页视觉</span>
              </div>
              <DetailViewer images={activeWork.detailImages} accent={activeWork.accent} />
            </div>

            {/* ===== 负责内容（底部信息条） ===== */}
            {activeWork.responsibilities && activeWork.responsibilities.length > 0 && (
              <div className="modal-section modal-section--scope" style={{ '--accent': activeWork.accent }}>
                <div className="modal-section__label">
                  <span className="mono">03 / SCOPE</span>
                  <span className="modal-section__label-cn">负责内容</span>
                </div>
                <ul className="modal-scope__list">
                  {activeWork.responsibilities.map((item, i) => (
                    <li key={i}>
                      <span
                        className="modal-scope__mark"
                        style={{ background: activeWork.accent }}
                      ></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {!activeWork.real && (
              <div className="workwall__modal-coming">
                <span className="mono">COMING SOON</span>
                <p>作品整理中，后续替换为真实作品</p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
