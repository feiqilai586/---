import { useEffect, useRef } from 'react';

/**
 * useTilt — 3D Tilt 悬停效果
 * 鼠标进入元素时根据位置产生轻微 3D 倾斜 + 光泽扫过
 * 尊重 prefers-reduced-motion
 *
 * 用法：const ref = useTilt({ max: 8, scale: 1.02, speed: 0.5 });
 *       <div ref={ref} className="tilt-card">...</div>
 *
 * 配合光泽层：.tilt-card__shine（可选，自动跟随鼠标位置）
 */
export function useTilt({ max = 6, scale = 1.02, speed = 0.4 } = {}) {
  const ref = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // 检测 reduced motion
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    let targetRX = 0;
    let targetRY = 0;
    let currentRX = 0;
    let currentRY = 0;
    let targetScale = 1;
    let currentScale = 1;

    const animate = () => {
      currentRX += (targetRX - currentRX) * speed;
      currentRY += (targetRY - currentRY) * speed;
      currentScale += (targetScale - currentScale) * speed;

      el.style.transform = `perspective(1000px) rotateX(${currentRX}deg) rotateY(${currentRY}deg) scale(${currentScale})`;

      // 光泽层跟随
      const shine = el.querySelector('.tilt-shine, .adv-card__shine, .project-card__shine');
      if (shine) {
        const rect = el.getBoundingClientRect();
        const x = (targetRY / max) * 50 + 50; // 0-100
        shine.style.background = `radial-gradient(circle at ${x}% 50%, rgba(255,255,255,0.08) 0%, transparent 60%)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width; // 0-1
      const y = (e.clientY - rect.top) / rect.height; // 0-1
      targetRY = (x - 0.5) * max * 2;
      targetRX = (0.5 - y) * max * 2;
      targetScale = scale;
    };

    const onEnter = () => {
      targetScale = scale;
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    const onLeave = () => {
      targetRX = 0;
      targetRY = 0;
      targetScale = 1;
      // 留一会儿让动画回正再停
      setTimeout(() => {
        if (targetRX === 0 && targetRY === 0 && targetScale === 1) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
          el.style.transform = '';
        }
      }, 250);
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [max, scale, speed]);

  return ref;
}

/**
 * useMagnetic — 磁吸按钮效果
 * 鼠标靠近时按钮轻微吸向鼠标位置
 */
export function useMagnetic({ strength = 0.3, speed = 0.5 } = {}) {
  const ref = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const animate = () => {
      currentX += (targetX - currentX) * speed;
      currentY += (targetY - currentY) * speed;
      el.style.transform = `translate(${currentX}px, ${currentY}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = (e.clientX - centerX) * strength;
      const dy = (e.clientY - centerY) * strength;

      // 只在按钮附近一定范围内生效
      const dist = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));
      const maxDist = Math.max(rect.width, rect.height);
      if (dist < maxDist * 1.5) {
        targetX = dx;
        targetY = dy;
      } else {
        targetX = 0;
        targetY = 0;
      }
    };

    const onEnter = () => {
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      setTimeout(() => {
        if (targetX === 0 && targetY === 0) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
          el.style.transform = '';
        }
      }, 400);
    };

    // 监听父级/全局 mousemove 以检测"靠近"
    const onDocMove = (e) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dist = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));
      const maxDist = Math.max(rect.width, rect.height) * 1.5;

      if (dist < maxDist) {
        const dx = (e.clientX - centerX) * strength * (1 - dist / maxDist);
        const dy = (e.clientY - centerY) * strength * (1 - dist / maxDist);
        targetX = dx;
        targetY = dy;
        if (!rafRef.current) {
          rafRef.current = requestAnimationFrame(animate);
        }
      } else {
        targetX = 0;
        targetY = 0;
      }
    };

    document.addEventListener('mousemove', onDocMove);
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      document.removeEventListener('mousemove', onDocMove);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [strength, speed]);

  return ref;
}
