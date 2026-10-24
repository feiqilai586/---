/**
 * 平滑滚动到指定 id 的元素
 * 不使用原生锚点跳转，避免 hashchange 触发页面刷新
 */
export function scrollToId(id, offset = 0) {
  const target = document.getElementById(id);
  if (!target) return;

  const top = target.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({
    top,
    behavior: 'smooth',
  });

  // 静默更新 URL hash，不触发滚动
  if (history.replaceState) {
    history.replaceState(null, '', `#${id}`);
  }
}

/**
 * 给 <a href="#xxx"> 用的点击处理器，阻止默认跳转，改用平滑滚动
 */
export function handleAnchorClick(e, offset = 0) {
  const href = e.currentTarget.getAttribute('href');
  if (!href || !href.startsWith('#')) return;

  e.preventDefault();
  const id = href.slice(1);
  scrollToId(id, offset);
}
