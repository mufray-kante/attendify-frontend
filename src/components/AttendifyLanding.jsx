import React from 'react';
import Logo from '../assets/attendify-logo.png';

export default function AttendifyLanding() {
  return (
    <div className='min-h-screen flex flex-col bg-gray-50 text-gray-800'>
      {/* Header */}
      <header className='bg-white shadow-md'>
        <div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <img src={Logo} alt='Attendify Logo' className='h-10 w-10' />
            <span className='text-2xl font-semibold'>Attendify</span>
          </div>
          <nav className='hidden md:flex gap-6 text-sm font-medium'>
            <a href='#features' className='hover:text-blue-600'>Features</a>
            <a href='#how' className='hover:text-blue-600'>How it Works</a>
            <a href='#contact' className='hover:text-blue-600'>Contact</a>
            <a href='/login' className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700'>Login</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className='flex-1'>
        <div className='max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center'>
          <div>
            <h1 className='text-4xl md:text-5xl font-bold leading-tight mb-6'>
              Smart Attendance, <br /> Built for Modern Institutions
            </h1>
            <p className='text-lg text-gray-600 mb-8'>
              Attendify is a professional attendance management platform designed
              for universities, colleges, and organizations that value accuracy,
              automation, and accountability.
            </p>
            <div className='flex gap-4'>
              <a href='/login' className='bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700'>
                Get Started
              </a>
              <a href='#features' className='border border-gray-300 px-6 py-3 rounded-lg font-medium hover:border-blue-600'>
                Learn More
              </a>
            </div>
          </div>
          <div className='bg-white shadow-xl rounded-2xl p-8'>
            <h3 className='text-xl font-semibold mb-4'>Why Attendify?</h3>
            <ul className='space-y-3 text-gray-600'>
              <li> Secure student & lecturer authentication</li>
              <li> Real-time attendance tracking</li>
              <li> SMS & WhatsApp notifications</li>
              <li> Admin analytics & reports</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id='features' className='bg-white py-20'>
        <div className='max-w-7xl mx-auto px-6'>
          <h2 className='text-3xl font-bold text-center mb-12'>Core Features</h2>
          <div className='grid md:grid-cols-3 gap-8'>
            <div className='p-6 border rounded-xl'>
              <h4 className='font-semibold mb-2'>Automated Attendance</h4>
              <p className='text-gray-600 text-sm'>
                Eliminate manual registers and reduce errors with smart attendance tracking.
              </p>
            </div>
            <div className='p-6 border rounded-xl'>
              <h4 className='font-semibold mb-2'>Instant Notifications</h4>
              <p className='text-gray-600 text-sm'>
                Notify students and guardians via SMS and WhatsApp in real time.
              </p>
            </div>
            <div className='p-6 border rounded-xl'>
              <h4 className='font-semibold mb-2'>Administrative Control</h4>
              <p className='text-gray-600 text-sm'>
                Powerful dashboards for administrators to monitor attendance trends.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id='contact' className='bg-gray-900 text-gray-300'>
        <div className='max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8'>
          <div>
            <h3 className='text-xl font-semibold text-white mb-3'>Attendify</h3>
            <p className='text-sm'>
              A professional attendance management solution built for scale,
              reliability, and real-world use.
            </p>
          </div>
          <div>
            <h4 className='font-semibold text-white mb-3'>Contact</h4>
            <p className='text-sm'>Email: joneskatarinawitt@gmail.com</p>
            <p className='text-sm'>Phone: +254794712825</p>
          </div>
          <div>
            <h4 className='font-semibold text-white mb-3'>Quick Links</h4>
            <ul className='space-y-2 text-sm'>
              <li><a href='#features' className='hover:underline'>Features</a></li>
              <li><a href='/login' className='hover:underline'>Login</a></li>
              <li><a href='#' className='hover:underline'>Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className='text-center text-xs text-gray-500 border-t border-gray-800 py-4'>
           {new Date().getFullYear()} Attendify. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
