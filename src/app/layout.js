import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/footer/Footer'
import Head from 'next/head'
import Logo from 'public/logo.png'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Codeverse Chronicles',
  description: 'Knowledge from every corner of the earth',
  image: Logo,
  url: 'https://'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta name="keywords" content="coding, code, codeverse, chronicles, codeverse chronicles, sandeep, sandy, sandeep prabhakula, java, android, spring boot, reactjs, nextjs, mongodb, sql, kotlin, javascript" />
        <meta property='og:title' content='Codeverse Chronicles' />
        <meta property='og:description' content='Knowledge from every corner of the earth' />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property='og:image' content={`${Logo}`} />
        <meta property='og:url' content={`https://codeverse-chronicles.netlify.app`} />
        <meta property='og:site_name' content='Codeverse Chronicles' />
        <meta name="google-site-verification" content="2KGVreVrJU60xWFLthw0PN0gpZ_CohdonqQ4ZOgWwo0" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1885388326286094"
          crossorigin="anonymous"></script>
      </Head>
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
