import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center">
        {/* <div className="flex items-center gap-2 mb-2 md:mb-0">
          <img src={require('../assets/Home/footer-home-icon.png')} alt="PG Logo" className="h-8 w-8" />
          <span className="font-bold text-lg">PG Accommodation System</span>
        </div> */}
        <div className="text-sm mb-2 md:mb-0">
          &copy; {new Date().getFullYear()} PG Accommodation System. All rights reserved.
        </div>
        {/* <div className="flex gap-4">
          <a href="/" className="hover:text-blue-400 transition">Home</a>
          <a href="/about" className="hover:text-blue-400 transition">About</a>
          <a href="/contact" className="hover:text-blue-400 transition">Contact</a>
        </div> */}
      </div>
    </footer>
  )
}

export default Footer
