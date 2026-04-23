import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserIcon, LockClosedIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import SignupModal from '../components/SignupModal'

function Login() {
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('password')
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Hardcoded credentials check
    if (username === 'admin' && password === 'password') {
      // Store admin login state
      localStorage.setItem('isAdmin', 'true')
      // Dispatch custom event to notify NotificationContext
      window.dispatchEvent(new Event('adminLogin'))
      // Navigate to home page
      navigate('/dashboard/home')
    } else if (username === 'vendor@zenk' && password === 'vendor123') {
      // Vendor login — WAIT for token before navigating to prevent race condition
      setIsLoggingIn(true)
      localStorage.setItem('isAdmin', 'false')
      localStorage.setItem('zenk_persona', 'vendor')
      const getApiBase = () => {
        if (import.meta.env.VITE_API_BASE_URL) return import.meta.env.VITE_API_BASE_URL;
        if (typeof window !== 'undefined' && (window.location.hostname.includes('vercel.app') || window.location.hostname.includes('zenk'))) {
          return 'https://deployment-production-27bd.up.railway.app';
        }
        return 'http://127.0.0.1:8000';
      };
      const API_BASE = getApiBase();
      try {
        const res = await fetch(`${API_BASE}/auth/token`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: 'vendor@zenk', password: 'vendor123' }),
        });
        const data = await res.json();
        if (data.access_token) {
          localStorage.setItem('zenk_token', data.access_token);
          console.log('[ZenkLogin] Token stored. Navigating to vendor portal.');
        }
      } catch (err) {
        console.warn('[ZenkLogin] Token fetch failed, navigating without token:', err);
      } finally {
        setIsLoggingIn(false);
        navigate('/dashboard/vendor-portal');
      }
    } else {
      alert('Invalid credentials. Use admin/password or vendor@zenk/vendor123')
    }
  }

  return (
    <div 
      className="min-h-screen relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(/LOGIN.jpg)'
      }}
    >
      {/* Branding (Top center on mobile, Top Left on desktop) */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-6 md:top-6 text-center md:text-left text-white z-10 w-full md:w-auto px-6">
        <img 
          src="/assets/zenk-logo.png" 
          alt="ZenK Logo" 
          style={{ 
            height: '60px', 
            objectFit: 'contain',
            filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))'
          }} 
          className="mx-auto md:mx-0"
        />
        <p 
          className="text-white mt-1"
          style={{ 
            fontFamily: "'Oriya MN', sans-serif",
            fontSize: '18px',
            textShadow: `
              1px 1px 0px rgba(0, 0, 0, 0.8),
              2px 2px 0px rgba(0, 0, 0, 0.6),
              3px 3px 0px rgba(0, 0, 0, 0.4),
              4px 4px 0px rgba(0, 0, 0, 0.2),
              5px 5px 15px rgba(0, 0, 0, 0.5),
              0 0 8px rgba(255, 255, 255, 0.2)
            `,
            transform: 'perspective(500px) rotateX(5deg)',
            transformStyle: 'preserve-3d'
          }}
        >
          Digital Sponsorship Ecosystem
        </p>
      </div>

      {/* Login Card (Centered below branding on mobile, Top Right on desktop) */}
      <div className="absolute top-[180px] left-1/2 -translate-x-1/2 w-[90%] max-w-[400px] md:w-auto md:max-w-none md:translate-x-0 md:left-auto md:right-6 md:top-6 z-20">
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-2xl p-4 md:p-3">
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row md:items-end gap-3 md:gap-2">
            {/* Username/Email Field */}
            <div className="flex flex-col w-full md:w-auto">
              <label htmlFor="username" className="text-white font-bold text-xs mb-1">
                Username / Email
              </label>
              <div className="relative w-full">
                <div className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none">
                  <UserIcon className="w-4 h-4 text-white" />
                </div>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full md:w-44 pl-8 pr-3 py-2 md:py-1.5 rounded-lg bg-gray-200/90 backdrop-blur-sm border border-gray-300/50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col w-full md:w-auto">
              <label htmlFor="password" className="text-white font-bold text-xs mb-1">
                Password
              </label>
              <div className="relative w-full">
                <div className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none">
                  <LockClosedIcon className="w-4 h-4 text-white" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full md:w-44 pl-8 pr-3 py-2 md:py-1.5 rounded-lg bg-gray-200/90 backdrop-blur-sm border border-gray-300/50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* Login Button */}
            <div className="flex flex-col w-full md:w-auto mt-1 md:mt-0">
              <label className="hidden md:block text-white font-bold text-xs mb-1 opacity-0 pointer-events-none">
                Login
              </label>
              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full md:w-10 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white p-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center h-10 md:h-9"
                aria-label="Login"
              >
                {isLoggingIn ? (
                  <span className="md:hidden mr-2 font-bold text-sm">Loading...</span>
                ) : (
                  <>
                    <span className="md:hidden mr-2 font-bold text-sm">Login</span>
                    <ArrowRightOnRectangleIcon className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Forgot Password & Sign Up Links */}
          <div className="mt-3 md:mt-2 text-center space-y-2 md:space-y-1 flex flex-col items-center">
            <a href="#" className="text-blue-300 hover:text-white text-xs underline block">
              Forgot password?
            </a>
            <button
              onClick={() => setIsSignupModalOpen(true)}
              className="text-blue-300 hover:text-white text-xs underline"
            >
              Don't have an account? Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* Signup Modal */}
      <SignupModal 
        isOpen={isSignupModalOpen} 
        onClose={() => setIsSignupModalOpen(false)} 
      />
    </div>
  )
}

export default Login

