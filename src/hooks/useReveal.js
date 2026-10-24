import { useEffect, useRef, useState } from 'react';

/**
 * useReveal — 滚动入场动画 Hook
 * 使用 IntersectionObserver 监听元素进入视口，触发 reveal 状态
 *
 * @param {Object} options
 * @param {number} options.threshold - 触发阈值 (0-1)
 * @param {string} options.rootMargin - 根边距
 * @param {boolean} options.once - 是否只触发一次
 * @returns {[React.RefObject, boolean]}
 */
export function useReveal(options = {}) {
  const { threshold = 0.15, rootMargin = '0px 0px -80px 0px', once = true } = options;
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // 检查 reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setRevealed(false);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, revealed];
}

export default useReveal;
