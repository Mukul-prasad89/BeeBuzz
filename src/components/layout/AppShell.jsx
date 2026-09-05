import { Outlet } from 'react-router-dom'
import TopBar from './TopBar'
import Sidebar from './Sidebar'
import BottomBar from './BottomBar'
import Toast from '../ui/Toast'
import Chatbot from '../ui/Chatbot'

export default function AppShell() {
  return (
    <div className="flex min-h-screen bg-honey-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
          <div className="max-w-content mx-auto">
            <Outlet />
          </div>
        </main>
        <BottomBar />
      </div>
      <Toast />
      <Chatbot />
    </div>
  )
}
