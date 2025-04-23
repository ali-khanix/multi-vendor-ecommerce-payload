import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'

import { ScrollArea } from './scroll-area'
import Link from 'next/link'

interface NavbarItem {
  href: string
  children: React.ReactNode
}

interface Props {
  items: NavbarItem[]
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const NavbarSidebar = ({ items, open, onOpenChange }: Props) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="p-0 transition-none">
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
              onClick={() => onOpenChange(false)}
            >
              {item.children}
            </Link>
          ))}

          <div className="border-t">
            <Link
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
              href={'/sign-in'}
            >
              Log in
            </Link>
          </div>
          <div className="">
            <Link
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
              href={'/sign-up'}
            >
              Sign up
            </Link>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
