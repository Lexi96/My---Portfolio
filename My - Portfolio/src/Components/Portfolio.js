import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Instagram, 
  MessageCircle, 
  Download, 
  Eye, 
  ExternalLink,
  Sun,
  Moon,
  Database,
  Code,
  Palette,
  Globe
} from 'lucide-react';

const Portfolio = () => {
  const [isDark, setIsDark] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [clickSparks, setClickSparks] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Typewriter effect for name
  const [displayedText, setDisplayedText] = useState('');
  const fullText = 'Mohammed Saif J';
  const typewriterRef = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (typewriterRef.current < fullText.length) {
        setDisplayedText(fullText.slice(0, typewriterRef.current + 1));
        typewriterRef.current++;
      }
    }, 150);

    return () => clearInterval(timer);
  }, []);

  // Click spark effect
  const createSpark = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const spark = {
      id: Date.now(),
      x,
      y,
    };
    
    setClickSparks(prev => [...prev, spark]);
    
    setTimeout(() => {
      setClickSparks(prev => prev.filter(s => s.id !== spark.id));
    }, 600);
  };

  // Smooth scroll
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
    setActiveSection(sectionId);
    setIsMenuOpen(false);
  };

  // Intersection Observer for active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    const sections = ['home', 'about', 'projects', 'skills', 'contact'];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const skills = [
    { name: 'SQL', icon: Database, level: 90 },
    { name: 'Python', icon: Code, level: 85 },
    { name: 'HTML', icon: Globe, level: 95 },
    { name: 'CSS', icon: Palette, level: 90 },
    { name: 'JavaScript', icon: Code, level: 88 },
    { name: 'React', icon: Code, level: 85 },
  ];

  const projects = [
    {
      id: 1,
      title: 'Project Alpha',
      description: 'A modern web application built with React and Node.js',
      tech: ['React', 'Node.js', 'MongoDB'],
      image: 'https://via.placeholder.com/400x250/64748b/ffffff?text=Project+Alpha'
    },
    {
      id: 2,
      title: 'Data Dashboard',
      description: 'Interactive dashboard for data visualization and analytics',
      tech: ['Python', 'SQL', 'React'],
      image: 'https://via.placeholder.com/400x250/475569/ffffff?text=Data+Dashboard'
    },
    {
      id: 3,
      title: 'E-Commerce Site',
      description: 'Full-stack e-commerce solution with payment integration',
      tech: ['JavaScript', 'CSS', 'HTML'],
      image: 'https://via.placeholder.com/400x250/334155/ffffff?text=E-Commerce'
    },
    {
      id: 4,
      title: 'Mobile App',
      description: 'Cross-platform mobile application for productivity',
      tech: ['React', 'SQL', 'Python'],
      image: 'https://via.placeholder.com/400x250/1e293b/ffffff?text=Mobile+App'
    }
  ];

  const BubbleMenu = () => {
    const menuItems = [
      { id: 'home', label: 'Home', icon: '🏠' },
      { id: 'about', label: 'About', icon: '👨‍💻' },
      { id: 'projects', label: 'Projects', icon: '💼' },
      { id: 'skills', label: 'Skills', icon: '⚡' },
      { id: 'contact', label: 'Contact', icon: '📧' },
    ];

    return (
      <div className={`fixed top-6 right-6 z-50 ${isMenuOpen ? 'scale-100' : 'scale-0'} transition-transform duration-300`}>
        <div className="relative">
          {menuItems.map((item, index) => (
            <div
              key={item.id}
              className={`absolute transition-all duration-500 ease-out ${
                isMenuOpen 
                  ? `translate-x-${index * -16} translate-y-${index * -16}` 
                  : 'translate-x-0 translate-y-0'
              }`}
              style={{
                transform: isMenuOpen 
                  ? `translate(${-Math.cos(index * 0.8) * 80}px, ${-Math.sin(index * 0.8) * 80}px)`
                  : 'translate(0, 0)',
                transitionDelay: `${index * 100}ms`
              }}
            >
              <button
                onClick={() => scrollToSection(item.id)}
                className={`w-12 h-12 rounded-full ${
                  isDark 
                    ? 'bg-slate-800 text-white border-slate-600' 
                    : 'bg-white text-slate-800 border-slate-200'
                } border-2 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-lg hover:scale-110 ${
                  activeSection === item.id ? 'ring-2 ring-blue-400' : ''
                }`}
                title={item.label}
              >
                {item.icon}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const ClickSpark = ({ spark }) => (
    <div
      className="absolute pointer-events-none z-50"
      style={{ left: spark.x, top: spark.y }}
    >
      <div className="relative">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full animate-ping"
            style={{
              transform: `rotate(${i * 45}deg) translateY(-20px)`,
              animationDelay: `${i * 50}ms`,
              animationDuration: '600ms'
            }}
          />
        ))}
      </div>
    </div>
  );

  const BlurText = ({ children, delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef();

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsVisible(true), delay);
          }
        },
        { threshold: 0.1 }
      );

      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }, [delay]);

    return (
      <div ref={ref} className={`transition-all duration-1000 ${
        isVisible ? 'blur-none opacity-100' : 'blur-sm opacity-0'
      }`}>
        {children}
      </div>
    );
  };

  const TiltedCard = ({ project, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <div
        className={`relative transition-all duration-500 ${
          index % 2 === 0 ? 'rotate-2' : '-rotate-2'
        } hover:rotate-0 hover:scale-105`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={createSpark}
      >
        <div className={`${
          isDark 
            ? 'bg-slate-800 border-slate-700' 
            : 'bg-white border-slate-200'
        } border-2 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300`}>
          <div className="relative overflow-hidden">
            <img 
              src={project.image} 
              alt={project.title}
              className={`w-full h-48 object-cover transition-transform duration-500 ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}
            />
            <div className={`absolute inset-0 ${
              isDark ? 'bg-slate-900' : 'bg-slate-100'
            } opacity-0 hover:opacity-90 transition-opacity duration-300 flex items-center justify-center`}>
              <div className="flex gap-4">
                <button className={`p-3 rounded-full ${
                  isDark ? 'bg-slate-700 text-white' : 'bg-white text-slate-700'
                } shadow-lg hover:scale-110 transition-transform`}>
                  <Eye className="w-5 h-5" />
                </button>
                <button className={`p-3 rounded-full ${
                  isDark ? 'bg-slate-700 text-white' : 'bg-white text-slate-700'
                } shadow-lg hover:scale-110 transition-transform`}>
                  <ExternalLink className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          <div className="p-6">
            <h3 className={`text-xl font-bold mb-2 ${
              isDark ? 'text-white' : 'text-slate-800'
            }`}>{project.title}</h3>
            <p className={`${
              isDark ? 'text-slate-300' : 'text-slate-600'
            } mb-4`}>{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, i) => (
                <span
                  key={i}
                  className={`px-3 py-1 rounded-full text-sm ${
                    isDark 
                      ? 'bg-slate-700 text-slate-300' 
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const SkillLoop = ({ skill, index }) => {
    const [progress, setProgress] = useState(0);
    
    useEffect(() => {
      const timer = setTimeout(() => {
        setProgress(skill.level);
      }, index * 200);
      return () => clearTimeout(timer);
    }, [skill.level, index]);

    return (
      <div className="relative group">
        <div className={`p-6 rounded-lg ${
          isDark 
            ? 'bg-slate-800 border-slate-700 hover:bg-slate-750' 
            : 'bg-white border-slate-200 hover:bg-slate-50'
        } border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}>
          <div className="flex items-center justify-center mb-4">
            <skill.icon className={`w-12 h-12 ${
              isDark ? 'text-blue-400' : 'text-blue-500'
            } group-hover:scale-110 transition-transform duration-300`} />
          </div>
          <h3 className={`text-lg font-semibold text-center mb-3 ${
            isDark ? 'text-white' : 'text-slate-800'
          }`}>
            {skill.name}
          </h3>
          <div className={`w-full h-2 rounded-full ${
            isDark ? 'bg-slate-700' : 'bg-slate-200'
          } overflow-hidden`}>
            <div 
              className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className={`text-center mt-2 text-sm ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            {skill.level}%
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDark 
        ? 'bg-slate-900 text-white' 
        : 'bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800'
    }`} onClick={createSpark}>
      
      {/* Click Sparks */}
      {clickSparks.map(spark => (
        <ClickSpark key={spark.id} spark={spark} />
      ))}

      {/* Fixed Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isDark 
          ? 'bg-slate-900/95 border-slate-700' 
          : 'bg-white/95 border-slate-200'
      } backdrop-blur-sm border-b`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className={`text-xl font-bold ${
            isDark ? 'text-white' : 'text-slate-800'
          }`}>
            MS
          </div>
          
          {/* Bubble Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`relative p-3 rounded-full ${
              isDark 
                ? 'bg-slate-800 text-white hover:bg-slate-700' 
                : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
            } transition-all duration-300 hover:scale-110`}
          >
            <div className={`w-6 h-6 flex flex-col justify-center items-center transition-all duration-300 ${
              isMenuOpen ? 'rotate-45' : ''
            }`}>
              <span className={`block w-5 h-0.5 ${
                isDark ? 'bg-white' : 'bg-slate-800'
              } transition-all duration-300 ${
                isMenuOpen ? 'rotate-90 translate-y-0' : '-translate-y-1'
              }`}></span>
              <span className={`block w-5 h-0.5 ${
                isDark ? 'bg-white' : 'bg-slate-800'
              } transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}></span>
              <span className={`block w-5 h-0.5 ${
                isDark ? 'bg-white' : 'bg-slate-800'
              } transition-all duration-300 ${
                isMenuOpen ? '-rotate-90 -translate-y-0' : 'translate-y-1'
              }`}></span>
            </div>
          </button>

          {/* Dark/Light Toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            className={`p-3 rounded-full ${
              isDark 
                ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            } transition-all duration-300 hover:scale-110`}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Bubble Menu */}
      <BubbleMenu />

      {/* Home Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className={`text-6xl md:text-8xl font-light mb-6 ${
              isDark ? 'text-white' : 'text-slate-800'
            }`}>
              {displayedText}
              <span className={`${
                isDark ? 'text-blue-400' : 'text-blue-500'
              } animate-pulse`}>|</span>
            </h1>
            <div className={`h-1 w-32 mx-auto ${
              isDark ? 'bg-blue-400' : 'bg-blue-500'
            } rounded-full`}></div>
          </div>
          
          <p className={`text-xl md:text-2xl mb-12 font-light ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Full Stack Developer & Creative Problem Solver
          </p>
          
          <div className="flex gap-6 justify-center flex-wrap">
            <button
              onClick={() => scrollToSection('projects')}
              className={`px-8 py-4 rounded-full ${
                isDark 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              } transition-all duration-300 hover:scale-105 hover:shadow-lg`}
            >
              View Projects
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className={`px-8 py-4 rounded-full border-2 ${
                isDark 
                  ? 'border-slate-600 text-slate-300 hover:bg-slate-800' 
                  : 'border-slate-300 text-slate-600 hover:bg-slate-50'
              } transition-all duration-300 hover:scale-105`}
            >
              Contact Me
            </button>
            <button className={`px-8 py-4 rounded-full border-2 ${
              isDark 
                ? 'border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-slate-900' 
                : 'border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white'
            } transition-all duration-300 hover:scale-105 flex items-center gap-2`}>
              <Download className="w-5 h-5" />
              Download Resume
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <BlurText>
            <h2 className={`text-4xl md:text-5xl font-light mb-16 text-center ${
              isDark ? 'text-white' : 'text-slate-800'
            }`}>
              About Me
            </h2>
          </BlurText>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <BlurText delay={200}>
              <div className="relative">
                <div className={`w-80 h-80 mx-auto rounded-full ${
                  isDark ? 'bg-slate-800' : 'bg-slate-200'
                } flex items-center justify-center text-6xl font-light ${
                  isDark ? 'text-slate-600' : 'text-slate-400'
                } hover:scale-105 transition-transform duration-500`}>
                  MS
                </div>
                <div className={`absolute -inset-4 rounded-full border-2 ${
                  isDark ? 'border-blue-400' : 'border-blue-500'
                } opacity-20 animate-pulse`}></div>
              </div>
            </BlurText>
            
            <BlurText delay={400}>
              <div className="space-y-6">
                <p className={`text-lg leading-relaxed ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  I'm a passionate full-stack developer with a keen eye for creating 
                  beautiful, functional, and user-centered digital experiences. My journey 
                  in technology combines technical expertise with creative problem-solving.
                </p>
                <p className={`text-lg leading-relaxed ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  I specialize in modern web technologies and enjoy bringing ideas to life 
                  through clean code and thoughtful design. When I'm not coding, you'll 
                  find me exploring new technologies and pushing the boundaries of what's possible.
                </p>
                <div className={`p-6 rounded-lg ${
                  isDark ? 'bg-slate-800' : 'bg-slate-100'
                } border-l-4 border-blue-500`}>
                  <p className={`italic ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    "Code is poetry written in logic, design is poetry written in pixels."
                  </p>
                </div>
              </div>
            </BlurText>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen flex items-center px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-4xl md:text-5xl font-light mb-16 text-center ${
            isDark ? 'text-white' : 'text-slate-800'
          }`}>
            Projects
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            {projects.map((project, index) => (
              <TiltedCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="min-h-screen flex items-center px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-4xl md:text-5xl font-light mb-16 text-center ${
            isDark ? 'text-white' : 'text-slate-800'
          }`}>
            Skills
          </h2>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <SkillLoop key={skill.name} skill={skill} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-4xl md:text-5xl font-light mb-16 ${
            isDark ? 'text-white' : 'text-slate-800'
          }`}>
            Let's Connect
          </h2>
          
          <p className={`text-xl mb-12 ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Ready to bring your next project to life? Let's talk!
          </p>
          
          <div className="flex justify-center gap-8 flex-wrap">
            {[
              { icon: Mail, label: 'Email', href: 'mailto:your.email@gmail.com' },
              { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/yourusername' },
              { icon: Github, label: 'GitHub', href: 'https://github.com/yourusername' },
              { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/yourusername' },
              { icon: MessageCircle, label: 'Discord', href: 'https://discord.com/users/yourusername' },
            ].map((social, index) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group p-6 rounded-full ${
                  isDark 
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' 
                    : 'bg-white hover:bg-slate-50 text-slate-600'
                } border-2 ${
                  isDark ? 'border-slate-700' : 'border-slate-200'
                } hover:border-blue-500 transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <social.icon className="w-8 h-8 group-hover:text-blue-500 transition-colors duration-300" />
              </a>
            ))}
          </div>
          
          <div className={`mt-16 p-8 rounded-lg ${
            isDark ? 'bg-slate-800' : 'bg-white'
          } border-2 ${
            isDark ? 'border-slate-700' : 'border-slate-200'
          } shadow-lg`}>
            <h3 className={`text-2xl font-semibold mb-4 ${
              isDark ? 'text-white' : 'text-slate-800'
            }`}>
              Get In Touch
            </h3>
            <p className={`${
              isDark ? 'text-slate-300' : 'text-slate-600'
            } mb-6`}>
              Have a project in mind? I'd love to hear about it. 
              Drop me a message and let's create something amazing together.
            </p>
            <a
              href="mailto:your.email@gmail.com"
              className={`inline-flex items-center gap-3 px-8 py-4 rounded-full ${
                isDark 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              } transition-all duration-300 hover:scale-105 hover:shadow-lg`}
            >
              <Mail className="w-5 h-5" />
              Send Message
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 border-t ${
        isDark 
          ? 'border-slate-700 bg-slate-900' 
          : 'border-slate-200 bg-slate-50'
      }`}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className={`${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            © 2025 Mohammed Saif J. Crafted with passion and precision.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;