import React, { useState, useEffect } from 'react';
import { ArrowLeft, Home, Code, Video, MessageSquare, BookOpen, Terminal, Play, ChevronRight, Zap, Brain, Github, Download, Star, FileText, Users } from 'lucide-react';

const Landing = ({ onEnterApp }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCube, setHoveredCube] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleViewDocs = () => {
    window.open('https://www.google.com/?client=safari&zx=1758100937927&no_sw_cr=1', '_blank');/* add whatever website u want to */
  };

  const cubeData = [
    {
      id: 1,
      faces: ['Data', 'Model', 'Train', 'Test', 'Deploy', 'Scale'],
      colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#fd79a8']
    },
    {
      id: 2,
      faces: ['GPU', 'CPU', 'RAM', 'SSD', 'NET', 'API'],
      colors: ['#a8e6cf', '#ffd93d', '#ffb347', '#87ceeb', '#dda0dd', '#98fb98']
    },
    {
      id: 3,
      faces: ['PyTorch', 'TensorFlow', 'Scikit', 'Pandas', 'NumPy', 'Jupyter'],
      colors: ['#ff8b94', '#b4a7d6', '#ffd1dc', '#f0e68c', '#deb887', '#f5deb3']
    }
  ];

  const Cube3D = ({ data, index }) => {
    const { faces, colors, id } = data;
    const isHovered = hoveredCube === id;
    
    const containerStyle = {
      perspective: '1000px',
      perspectiveOrigin: '50% 50%',
      width: '140px',
      height: '140px',
      margin: '20px',
      opacity: 0,
      transform: 'translateY(50px)',
      animation: `fadeInUp 1s ease-out ${index * 0.5}s forwards`
    };

    const cubeStyle = {
      position: 'relative',
      width: '140px',
      height: '140px',
      transformStyle: 'preserve-3d',
      transform: `
        rotateX(${15 + mousePos.y + (isHovered ? 20 : 0)}deg) 
        rotateY(${15 + mousePos.x + (isHovered ? 20 : 0)}deg)
        scale(${isHovered ? 1.15 : 1})
      `,
      transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      animation: `cubeRotate 20s linear infinite`,
      animationPlayState: isHovered ? 'paused' : 'running'
    };

    const faces3D = [
      { name: 'front', transform: 'rotateY(0deg) translateZ(70px)' },
      { name: 'back', transform: 'rotateY(180deg) translateZ(70px)' },
      { name: 'right', transform: 'rotateY(90deg) translateZ(70px)' },
      { name: 'left', transform: 'rotateY(-90deg) translateZ(70px)' },
      { name: 'top', transform: 'rotateX(90deg) translateZ(70px)' },
      { name: 'bottom', transform: 'rotateX(-90deg) translateZ(70px)' }
    ];

    const faceStyle = (faceIndex) => ({
      position: 'absolute',
      width: '140px',
      height: '140px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '14px',
      fontWeight: '700',
      color: 'white',
      textShadow: '0 2px 8px rgba(0,0,0,0.6)',
      background: `linear-gradient(135deg, ${colors[faceIndex]}, ${colors[(faceIndex + 1) % colors.length]})`,
      border: `2px solid ${colors[faceIndex]}40`,
      borderRadius: '8px',
      backdropFilter: 'blur(10px)',
      boxShadow: `
        inset 0 2px 10px rgba(255,255,255,0.3),
        0 8px 25px ${colors[faceIndex]}30
      `,
      transform: faces3D[faceIndex].transform,
      transition: 'all 0.3s ease'
    });

    return (
      <div 
        style={containerStyle}
        onMouseEnter={() => setHoveredCube(id)}
        onMouseLeave={() => setHoveredCube(null)}
      >
        <div style={cubeStyle}>
          {faces3D.map((face, faceIndex) => (
            <div key={face.name} style={faceStyle(faceIndex)}>
              <span style={{ 
                textAlign: 'center',
                fontSize: faces[faceIndex].length > 8 ? '12px' : '14px',
                lineHeight: '1.2'
              }}>
                {faces[faceIndex]}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const FloatingParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            background: `hsl(${Math.random() * 360}, 70%, 70%)`,
            animation: `float ${Math.random() * 20 + 10}s linear infinite`,
            animationDelay: `${Math.random() * 20}s`
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 198, 121, 0.05) 0%, transparent 50%),
            #000
          `
        }}
      />
      
      {/* Sparkle effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(2px 2px at 20px 30px, rgba(255, 255, 255, 0.1), transparent),
            radial-gradient(2px 2px at 40px 70px, rgba(255, 255, 255, 0.05), transparent),
            radial-gradient(1px 1px at 90px 40px, rgba(255, 255, 255, 0.08), transparent)
          `,
          backgroundSize: '100px 100px',
          animation: 'sparkle 20s linear infinite'
        }}
      />
      
      <FloatingParticles />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8 text-center">
        
        {/* Hero Section */}
        <div 
          style={{
            marginBottom: '4rem',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 1s ease-out'
          }}
        >
          <h1 
            className="mb-4"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: 800,
              background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7, #fd79a8)',
              backgroundSize: '300% 300%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'gradientShift 8s ease-in-out infinite',
              letterSpacing: '-0.02em'
            }}
          >
            The Catalyst Project
          </h1>
          <p 
            style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
              color: 'rgba(255, 255, 255, 0.8)',
              lineHeight: 1.6,
              maxWidth: '600px',
              margin: '0 auto 2rem',
              fontWeight: 300
            }}
          >
            Exploring multidimensional optimization spaces with cutting-edge algorithms and interactive visualizations
          </p>
        </div>

        {/* 3D Cubes Container */}
        <div 
          className="flex gap-8 items-center justify-center flex-wrap my-16"
          style={{ 
            perspective: '1200px',
            perspectiveOrigin: '50% 50%'
          }}
        >
          {cubeData.map((cube, index) => (
            <Cube3D key={cube.id} data={cube} index={index} />
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-6 mt-8 flex-wrap justify-center">
          <button 
            className="group relative px-10 py-5 border-none rounded-full text-lg font-semibold cursor-pointer overflow-hidden transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 text-white"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              boxShadow: '0 8px 30px rgba(102, 126, 234, 0.3)'
            }}
            onClick={onEnterApp}
          >
            <span className="relative z-10">Enter Application</span>
            <div 
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
            />
          </button>
          
          <button 
            className="group relative px-10 py-5 border-2 rounded-full text-lg font-semibold cursor-pointer transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 text-white"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderColor: 'rgba(255, 255, 255, 0.3)',
              backdropFilter: 'blur(10px)'
            }}
            onClick={handleViewDocs}
          >
            <span className="relative z-10">View Documentation</span>
            <div 
              className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
            />
          </button>
        </div>

        {/* Features Grid */}
        <div 
          className="grid gap-6 mt-16 w-full max-w-4xl"
          style={{ 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 1s ease-out 1s'
          }}
        >
          {[
            { title: 'Multi-Framework', desc: 'Support for PyTorch, TensorFlow, and more', icon: '🔧', delay: '0.1s' },
            { title: 'GPU Accelerated', desc: 'Optimized for CUDA and distributed training', icon: '⚡', delay: '0.2s' },
            { title: 'Real-time Metrics', desc: 'Live monitoring and performance analytics', icon: '📊', delay: '0.3s' },
            { title: 'Auto-scaling', desc: 'Dynamic resource allocation and optimization', icon: '🚀', delay: '0.4s' }
          ].map((feature, i) => (
            <div
              key={i}
              className="group relative text-center p-6 rounded-2xl border transition-all duration-500 hover:bg-white/10 hover:-translate-y-3 hover:scale-105 cursor-pointer"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(15px)',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                transitionDelay: feature.delay
              }}
            >
              <div className="text-3xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <div className="text-lg font-semibold mb-2 text-cyan-300">
                {feature.title}
              </div>
              <div className="text-sm text-white/70 leading-relaxed">
                {feature.desc}
              </div>
              <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          25% { background-position: 100% 50%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 0% 100%; }
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes cubeRotate {
          0% { transform: rotateX(15deg) rotateY(15deg) rotateZ(0deg); }
          25% { transform: rotateX(35deg) rotateY(95deg) rotateZ(90deg); }
          50% { transform: rotateX(55deg) rotateY(195deg) rotateZ(180deg); }
          75% { transform: rotateX(35deg) rotateY(275deg) rotateZ(270deg); }
          100% { transform: rotateX(15deg) rotateY(375deg) rotateZ(360deg); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        @keyframes sparkle {
          0% { transform: translateY(0); }
          100% { transform: translateY(-100px); }
        }

        @media (max-width: 768px) {
          .flex { flex-direction: column; }
          .gap-8 { gap: 1rem; }
        }
      `}</style>
    </div>
  );
};

export default Landing;