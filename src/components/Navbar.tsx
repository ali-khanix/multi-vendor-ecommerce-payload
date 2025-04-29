'use client'

// Components
import Link from 'next/link'
import { Poppins } from 'next/font/google'

import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { MenuIcon } from 'lucide-react'
import { NavbarSidebar } from './NavbarSidebar'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['700'],
})

interface navbarItemProps {
  href: string
  children: React.ReactNode
  isActive?: boolean
}

const NavbarItem = ({ href, children, isActive }: navbarItemProps) => {
  return (
    <Button
      asChild
      variant={'outline'}
      className={cn(
        'bg-transparent hover:bg-transparent rounded-full hover:border-primary border-transparent px-3.5 text-lg',
        isActive && 'bg-black text-white hover:bg-black hover:text-white',
      )}
    >
      <Link href={href}>{children}</Link>
    </Button>
  )
}

const navbarItems = [
  {
    href: '/',
    children: 'Home',
  },
  {
    href: '/about',
    children: 'About',
  },
  {
    href: '/features',
    children: 'Features',
  },
  {
    href: '/pricing',
    children: 'Pricing',
  },
  {
    href: '/contact',
    children: 'Contact',
  },
]

const Navbar = () => {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  return (
    <nav className="h-20 flex border-b justify-between bg-white font-medium ">
      <Link className="flex items-center pl-6" href={'/'}>
        <span className={cn('text-5xl font-semibold', poppins.className)}>funroad</span>
      </Link>

      <NavbarSidebar items={navbarItems} open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />

      <div className="items-center gap-4 hidden lg:flex">
        {navbarItems.map((item) => (
          <NavbarItem href={item.href} key={item.href} isActive={pathname === item.href}>
            {item.children}
          </NavbarItem>
        ))}
      </div>

      <div className="hidden lg:flex">
        <Button asChild variant={'secondary'} className="nav-btn  bg-white hover:bg-pink-400">
          <Link href={'/sign-in'}>Log in</Link>
        </Button>
        <Button asChild className="nav-btn bg-black text-white hover:bg-pink-400">
          <Link href={'/sign-up'}>Start Selling</Link>
        </Button>
      </div>

      <div className="flex justify-center items-center lg:hidden">
        <Button
          variant={'ghost'}
          className="size-12 border-transparent bg-white"
          onClick={() => setIsSidebarOpen(true)}
        >
          <MenuIcon />
        </Button>
      </div>
    </nav>
  )
}

export default Navbar
