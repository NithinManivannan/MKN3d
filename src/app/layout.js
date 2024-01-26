import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/footer/Footer'
import CartProvider from "@/provider/cartProvider";
import Script from 'next/script'
import { NotificationProvider } from "@/provider/notificationContext"; // Import the provider
import Notification from '@/components/notification/notification'; // Import the notification component

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
  <>
  <NotificationProvider>
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <div className='container'>
            <Navbar />
            <Notification />
            {children}
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
    <Script src="https://checkout.razorpay.com/v1/checkout.js"
    />
    </NotificationProvider>
  </>
    
  );
}