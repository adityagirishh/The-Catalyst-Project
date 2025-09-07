import React, { useState, useEffect } from 'react';

const Landing = ({ onEnterApp }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCube, setHoveredCube] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleViewDocs = () => {
    // Navigate to documentation 
    window.open('', '_blank');
  };

  const cubeData = [
    {
      id: 1,
      faces: ['Data', 'Model', 'Train', 'Test', 'Deploy', 'Scale'],
      colors: ['#ff6b6b', '#4ecdc4']
    },
    {
      id: 2,
      faces: ['GPU', 'CPU', 'RAM', 'SSD', 'NET', 'API'],
      colors: ['#a8e6cf', '#ffd93d']
    },
    {
      id: 3,
      faces: ['PyTorch', 'TensorFlow', 'Scikit', 'Pandas', 'NumPy', 'Jupyter'],
      colors: ['#ff8b94', '#b4a7d6']
    }
  ];

  const Cube = ({ data, index }) => {
    const { faces, colors, id } = data;
    const isHovered = hoveredCube === id;
    
    return (
      <div 
        className="cube-container"
        onMouseEnter={() => setHoveredCube(id)}
        onMouseLeave={() => setHoveredCube(null)}
        style={{
          animationDelay: `${index * 0.5}s`,
          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          transition: 'transform 0.3s ease'
        }}
      >
        <div className={`cube ${isHovered ? 'hovered' : ''}`}>
          <div className="cube-face front" style={{background: `linear-gradient(45deg, ${colors[0]}, ${colors[1]})`}}>
            {faces[0]}
          </div>
          <div className="cube-face back" style={{background: `linear-gradient(45deg, ${colors[1]}, ${colors[0]})`}}>
            {faces[1]}
          </div>
          <div className="cube-face right" style={{background: `linear-gradient(45deg, ${colors[0]}, ${colors[1]})`}}>
            {faces[2]}
          </div>
          <div className="cube-face left" style={{background: `linear-gradient(45deg, ${colors[1]}, ${colors[0]})`}}>
            {faces[3]}
          </div>
          <div className="cube-face top" style={{background: `linear-gradient(45deg, ${colors[0]}, ${colors[1]})`}}>
            {faces[4]}
          </div>
          <div className="cube-face bottom" style={{background: `linear-gradient(45deg, ${colors[1]}, ${colors[0]})`}}>
            {faces[5]}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <style jsx>{`
        .landing-container {
          min-height: 100vh;
          background: radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
                     radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
                     radial-gradient(circle at 40% 40%, rgba(120, 198, 121, 0.05) 0%, transparent 50%),
                     #000;
          color: white;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          perspective: 1200px;
          overflow: hidden;
          position: relative;
        }

        .landing-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(2px 2px at 20px 30px, rgba(255, 255, 255, 0.1), transparent),
            radial-gradient(2px 2px at 40px 70px, rgba(255, 255, 255, 0.05), transparent),
            radial-gradient(1px 1px at 90px 40px, rgba(255, 255, 255, 0.08), transparent);
          background-size: 100px 100px;
          animation: sparkle 20s linear infinite;
          pointer-events: none;
        }

        @keyframes sparkle {
          0% { transform: translateY(0); }
          100% { transform: translateY(-100px); }
        }

        .hero-section {
          text-align: center;
          margin-bottom: 4rem;
          z-index: 10;
          opacity: ${isVisible ? 1 : 0};
          transform: translateY(${isVisible ? '0' : '30px'});
          transition: all 1s ease-out;
        }

        .hero-title {
          font-size: clamp(2.5rem, 6vw, 5rem);
          font-weight: 800;
          margin-bottom: 1rem;
          background: linear-gradient(
            45deg, 
            #ff6b6b, 
            #4ecdc4, 
            #45b7d1, 
            #96ceb4, 
            #ffeaa7,
            #fd79a8
          );
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 8s ease-in-out infinite;
          letter-spacing: -0.02em;
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          25% { background-position: 100% 50%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 0% 100%; }
        }

        .hero-subtitle {
          font-size: clamp(1.1rem, 2.5vw, 1.4rem);
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.6;
          max-width: 600px;
          margin: 0 auto 2rem;
          font-weight: 300;
        }

        .cubes-container {
          display: flex;
          gap: 4rem;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          margin: 3rem 0;
          z-index: 5;
          perspective: 1200px;
        }

        .cube-container {
          animation: fadeInUp 1s ease-out forwards;
          opacity: 0;
          transform: translateY(50px);
          perspective: 1000px;
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .cube {
          width: 120px;
          height: 120px;
          position: relative;
          transform-style: preserve-3d;
          animation: rotate3d 15s linear infinite;
          transition: animation-duration 0.3s ease;
        }

        .cube.hovered {
          animation-duration: 5s;
        }

        @keyframes rotate3d {
          0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          33% { transform: rotateX(120deg) rotateY(120deg) rotateZ(0deg); }
          66% { transform: rotateX(240deg) rotateY(240deg) rotateZ(120deg); }
          100% { transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg); }
        }

        .cube-face {
          position: absolute;
          width: 120px;
          height: 120px;
          border: 2px solid rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.9rem;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(5px);
          transition: all 0.3s ease;
          color: white;
        }

        .cube-face:hover {
          border-color: rgba(255, 255, 255, 0.5);
          box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.1);
        }

        .cube-face.front { 
          transform: translateZ(60px); 
        }
        .cube-face.back { 
          transform: translateZ(-60px) rotateY(180deg); 
        }
        .cube-face.right { 
          transform: rotateY(90deg) translateZ(60px); 
        }
        .cube-face.left { 
          transform: rotateY(-90deg) translateZ(60px); 
        }
        .cube-face.top { 
          transform: rotateX(90deg) translateZ(60px); 
        }
        .cube-face.bottom { 
          transform: rotateX(-90deg) translateZ(60px); 
        }

        .cta-section {
          display: flex;
          gap: 1.5rem;
          margin-top: 3rem;
          flex-wrap: wrap;
          justify-content: center;
          z-index: 10;
        }

        .cta-button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 1.2rem 2.5rem;
          border: none;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          text-decoration: none;
          display: inline-block;
          position: relative;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(102, 126, 234, 0.3);
        }

        .cta-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }

        .cta-button:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4);
        }

        .cta-button:hover::before {
          left: 100%;
        }

        .cta-secondary {
          background: transparent;
          border: 2px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(10px);
        }

        .cta-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.6);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-top: 4rem;
          width: 100%;
          max-width: 800px;
        }

        .feature-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 1.5rem;
          text-align: center;
          transition: all 0.3s ease;
          opacity: ${isVisible ? 1 : 0};
          transform: translateY(${isVisible ? '0' : '20px'});
        }

        .feature-card:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-5px);
          border-color: rgba(255, 255, 255, 0.3);
        }

        .feature-title {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #4ecdc4;
        }

        .feature-description {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.4;
        }

        @media (max-width: 768px) {
          .landing-container {
            padding: 1rem;
          }

          .cubes-container {
            gap: 2rem;
            flex-direction: column;
          }

          .cube {
            width: 100px;
            height: 100px;
          }

          .cube-face {
            width: 100px;
            height: 100px;
            font-size: 0.8rem;
          }

          .cube-face.front { transform: translateZ(50px); }
          .cube-face.back { transform: translateZ(-50px) rotateY(180deg); }
          .cube-face.right { transform: rotateY(90deg) translateZ(50px); }
          .cube-face.left { transform: rotateY(-90deg) translateZ(50px); }
          .cube-face.top { transform: rotateX(90deg) translateZ(50px); }
          .cube-face.bottom { transform: rotateX(-90deg) translateZ(50px); }

          .cta-section {
            flex-direction: column;
            align-items: center;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      
      <div className="landing-container">
        <div className="hero-section">
          <h1 className="hero-title">The Catalyst Project</h1>
          <p className="hero-subtitle">
            Exploring multidimensional optimization spaces with cutting-edge algorithms and interactive visualizations
          </p>
        </div>

        <div className="cubes-container">
          {cubeData.map((cube, index) => (
            <Cube key={cube.id} data={cube} index={index} />
          ))}
        </div>

        <div className="cta-section">
          <button 
            className="cta-button"
            onClick={onEnterApp}
          >
            Enter Application
          </button>
          <button 
            className="cta-button cta-secondary"
            onClick={handleViewDocs}
          >
            View Documentation
          </button>
        </div>

        <div className="features-grid">
          <div className="feature-card" style={{transitionDelay: '0.1s'}}>
            <div className="feature-title">Multi-Framework</div>
            <div className="feature-description">
              Support for PyTorch, TensorFlow, and more
            </div>
          </div>
          <div className="feature-card" style={{transitionDelay: '0.2s'}}>
            <div className="feature-title">GPU Accelerated</div>
            <div className="feature-description">
              Optimized for CUDA and distributed training
            </div>
          </div>
          <div className="feature-card" style={{transitionDelay: '0.3s'}}>
            <div className="feature-title">Real-time Metrics</div>
            <div className="feature-description">
              Live monitoring and performance analytics
            </div>
          </div>
          <div className="feature-card" style={{transitionDelay: '0.4s'}}>
            <div className="feature-title">Auto-scaling</div>
            <div className="feature-description">
              Dynamic resource allocation and optimization
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;