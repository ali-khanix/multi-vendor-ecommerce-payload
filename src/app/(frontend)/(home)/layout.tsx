import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <main>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 bg-[#f3f3f3]">{children}</div>
        <Footer />
      </div>
    </main>
  )
}

export default Layout
