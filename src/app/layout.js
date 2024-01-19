import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/footer/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    deafult: 'MKN 3D',
    template: '%s | MKN 3D'
  },
  description: '3D Printing solutions and gifts company',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='container'>    
        <Navbar />
        {children}
        <Footer />
        </div>
      </body>   
    </html>
  )
}