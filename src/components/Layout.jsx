import { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import ChatWidget from './chat/ChatWidget'

function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="h-screen bg-slate-50 flex flex-col overflow-hidden">
      <Header onMenuToggle={() => setIsSidebarOpen(prev => !prev)} />
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
      <ChatWidget />
    </div>
  )
}

export default Layout
