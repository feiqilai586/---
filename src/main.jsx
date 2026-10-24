import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/global.css';
import './styles/reveal.css';
import './components/Navbar.css';
import './components/Hero.css';
import './components/WorkWall.css';
import './components/About.css';
import './components/Projects.css';
import './components/Advantages.css';
import './components/Contact.css';

// 加载动画样式
const loaderStyle = document.createElement('style');
loaderStyle.textContent = `
.app__loader {
  position: fixed;
  inset: 0;
  background: var(--bg-primary);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.8s var(--ease-out), visibility 0.8s;
}
.app--loaded .app__loader {
  opacity: 0;
  visibility: hidden;
}
.app__loader-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
.app__loader-text {
  font-size: 11px;
  letter-spacing: 0.3em;
  color: var(--text-tertiary);
}
.app__loader-bar {
  width: 200px;
  height: 1px;
  background: var(--border-subtle);
  overflow: hidden;
}
.app__loader-bar-fill {
  width: 100%;
  height: 100%;
  background: var(--accent-primary);
  animation: loaderFill 1.2s var(--ease-out) forwards;
}
@keyframes loaderFill {
  from { transform: scaleX(0); transform-origin: left; }
  to { transform: scaleX(1); transform-origin: left; }
}
`;
document.head.appendChild(loaderStyle);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
