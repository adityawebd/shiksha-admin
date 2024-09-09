import React from 'react'
import { BarChart,GraduationCap, Wallet, Newspaper, BellRing, Paperclip, Brush, Wrench, LogOut, Contact2 } from 'lucide-react'
import Image from 'next/image'

const Sidebar = () => {
  return (
    <aside className="fixed flex h-screen w-64 flex-col overflow-y-auto border-r bg-newblue px-5 py-8 ">
      <div>
        <Image className='rounded-2xl' src={"/assets/images/image_UB.png"} width={100} height={86} alt='LOGO' />
      </div>

      <div className="mt-6 flex flex-1 flex-col justify-between">

        <nav className="-mx-3 space-y-6 ">
          
          <div className="space-y-3 ">
            <label className="px-3 text-xs font-semibold uppercase text-white">College</label>
            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-50 hover:text-gray-700"
              href="/dashboard"
            >
              <BarChart className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Dashboard</span>
            </a>
            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="/collages"
            >
              <GraduationCap  className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Colleges</span>
            </a>
          </div>

          <div className="space-y-3 ">
            <label className="px-3 text-xs font-semibold uppercase text-white">content</label>
            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="/blogs"
            >
              <Newspaper className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Blogs</span>
            </a>
            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="/notification"
            >
              <BellRing className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Notifications</span>
            </a>
            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="#"
            >
              <Paperclip className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Checklists</span>
            </a>
          </div>

          <div className="space-y-3 ">
            <label className="px-3 text-xs font-semibold uppercase text-white">Customization</label>
            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="leads"
            >
              <Contact2 className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Contact / Lead &apos; s</span>
            </a>
            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="#"
            >
              <Wrench className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Setting</span>
            </a>
          </div>
          
          <div className='space-y-3'>
          <label className="px-3 text-xs font-semibold uppercase text-white">Others</label>
          <a
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="#"
            >
              <LogOut className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Logout</span>
            </a>
          </div>

        </nav>
      </div>
    </aside>
  )
}
export default Sidebar
