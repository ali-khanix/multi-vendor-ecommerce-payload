'use client'

interface Props {
  disabled?: boolean
  data: CustomCategory[]
}

import { ListFilterIcon, SearchIcon } from 'lucide-react'
import { Input } from '../ui/input'
import { CustomCategory } from '@/app/(frontend)/(home)/types'
import { CategoriesSidebar } from './categories-sidbar'
import { useState } from 'react'
import { Button } from '../ui/button'

const SearchInput = ({ disabled, data }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  return (
    <div className=" flex gap-4 items-center justify-between w-full">
      <CategoriesSidebar data={data} open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />
      <div className="relative w-full">
        <SearchIcon className="absolute size-4 left-4 top-1/2 -translate-1/2 text-neutral-500 " />
        <Input className="pl-8 " placeholder="Search products..." />
      </div>

      {/* TODO: add categories vew all button */}
      <Button
        variant={'elevated'}
        className="size-12 shrink-0 lg:hidden"
        onClick={() => setIsSidebarOpen(true)}
      >
        <ListFilterIcon />
      </Button>
      {/* TODO: add library button */}
    </div>
  )
}

export default SearchInput
