import { useState, useEffect } from 'react';
import { Github, Mail, Linkedin, ExternalLink, Menu, X } from 'lucide-react';

// Define types for GitHub projects
interface GitHubProject {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  topics: string[];
  language: string;
  stargazers_count: number;
  forks_count: number;
}

function App() {
  const [projects, setProjects] = useState<GitHubProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fetch GitHub projects
  const fetchProjects = async (user: string) => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`https://api.github.com/users/${user}/repos?sort=updated&per_page=10`);
      
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
      
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch projects');
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProjects(username);
  };

  // Skills section data
  const skills = [
    { category: 'Frontend', items: ['React', 'TypeScript', 'HTML/CSS', 'Tailwind CSS'] },
    { category: 'Backend', items: ['Node.js', 'Express', 'Python', 'MongoDB'] },
    { category: 'Tools', items: ['Git', 'GitHub', 'VS Code', 'Docker'] },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">My Portfolio</h1>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#about" className="text-gray-600 hover:text-gray-900">About</a>
            <a href="#projects" className="text-gray-600 hover:text-gray-900">Projects</a>
            <a href="#skills" className="text-gray-600 hover:text-gray-900">Skills</a>
            <a href="#contact" className="text-gray-600 hover:text-gray-900">Contact</a>
          </nav>
        </div>
        
        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white py-2 px-4">
            <nav className="flex flex-col space-y-3">
              <a 
                href="#about" 
                className="text-gray-600 hover:text-gray-900 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a 
                href="#projects" 
                className="text-gray-600 hover:text-gray-900 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </a>
              <a 
                href="#skills" 
                className="text-gray-600 hover:text-gray-900 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Skills
              </a>
              <a 
                href="#contact" 
                className="text-gray-600 hover:text-gray-900 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
            </nav>
          </div>
        )}
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section id="about" className="mb-16 py-16 flex flex-col items-center text-center">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-6">
            <img 
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">John Doe</h1>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl">
            Full Stack Developer passionate about building web applications that solve real-world problems.
          </p>
          <div className="flex space-x-4">
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition">
              <Linkedin size={20} />
            </a>
            <a href="mailto:contact@example.com" className="p-2 bg-red-500 text-white rounded-full hover:bg-red-400 transition">
              <Mail size={20} />
            </a>
          </div>
        </section>

        {/* GitHub Projects Section */}
        <section id="projects" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">My GitHub Projects</h2>
          
          <form onSubmit={handleSubmit} className="mb-8 max-w-md mx-auto">
            <div className="flex">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter GitHub username"
                className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Load Projects
              </button>
            </div>
          </form>

          {loading && username && (
            <div className="text-center py-8">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
              <p className="mt-2 text-gray-600">Loading projects...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.name}</h3>
                    <p className="text-gray-600 mb-4 h-20 overflow-hidden">
                      {project.description || 'No description available'}
                    </p>
                    
                    {project.language && (
                      <div className="mb-4">
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {project.language}
                        </span>
                        {project.stargazers_count > 0 && (
                          <span className="inline-block ml-2 text-xs text-gray-500">
                            ★ {project.stargazers_count}
                          </span>
                        )}
                      </div>
                    )}
                    
                    {project.topics && project.topics.length > 0 && (
                      <div className="mb-4 flex flex-wrap gap-1">
                        {project.topics.slice(0, 3).map((topic, index) => (
                          <span key={index} className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex space-x-2">
                      <a 
                        href={project.html_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                      >
                        <Github size={16} className="mr-1" /> Code
                      </a>
                      
                      {project.homepage && (
                        <a 
                          href={project.homepage} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center text-sm text-green-600 hover:text-green-800"
                        >
                          <ExternalLink size={16} className="mr-1" /> Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : !loading && username ? (
            <p className="text-center text-gray-600">No projects found. Try a different username.</p>
          ) : !username ? (
            <p className="text-center text-gray-600">Enter a GitHub username to see their projects.</p>
          ) : null}
        </section>

        {/* Skills Section */}
        <section id="skills" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Skills</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skills.map((skillGroup, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{skillGroup.category}</h3>
                <ul className="space-y-2">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <li key={skillIndex} className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Contact Me</h2>
          
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your message"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Send Message
              </button>
            </form>
            
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Or reach me directly:</h3>
              
              <div className="space-y-3">
                <a href="mailto:contact@example.com" className="flex items-center text-gray-600 hover:text-gray-900">
                  <Mail size={20} className="mr-2" />
                  contact@example.com
                </a>
                
                <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 hover:text-gray-900">
                  <Github size={20} className="mr-2" />
                  github.com/johndoe
                </a>
                
                <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 hover:text-gray-900">
                  <Linkedin size={20} className="mr-2" />
                  linkedin.com/in/johndoe
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} John Doe. All rights reserved.</p>
            
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <Linkedin size={20} />
              </a>
              <a href="mailto:contact@example.com" className="hover:text-gray-300">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;