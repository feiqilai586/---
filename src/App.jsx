import { useEffect, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import WorkWall from './components/WorkWall.jsx';
import About from './components/About.jsx';
import Projects from './components/Projects.jsx';
import Advantages from './components/Advantages.jsx';
import Contact from './components/Contact.jsx';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // 页面加载动画
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`app ${loaded ? 'app--loaded' : ''}`}>
      <Navbar />
      <main>
        <Hero />
        <WorkWall />
        <About />
        <Projects />
        <Advantages />
        <Contact />
      </main>

      {/* 加载遮罩 */}
      <div className="app__loader">
        <div className="app__loader-inner">
          <span className="app__loader-text mono">LOADING</span>
          <div className="app__loader-bar">
            <div className="app__loader-bar-fill"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
