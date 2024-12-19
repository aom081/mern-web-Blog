import React from 'react'
import { Outlet } from 'react-router'
import Header from './Header'
import Footer from './footer'

const Layout = () => {
  return (
    <div className='container mx-auto h-sereen'>
      <header>
        <Header />
      </header>
      <main className='flex item-center justify-center container min-h-screen mx-auto max-h-full p-4 sm:6 lg:p-8'/>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout
