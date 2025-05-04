'use client'

import { useEffect, useRef, useState } from 'react'

import { CategoryDropdown } from './category-dropdown'
import { CustomCategory } from '@/app/(frontend)/(home)/types'

import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { CategoriesSidebar } from './categories-sidbar'

import { ListFilterIcon } from 'lucide-react'

interface Props {
  data: CustomCategory[]
}

export const Categories = ({ data }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const measuerRef = useRef<HTMLDivElement>(null)
  const viewAllRef = useRef<HTMLDivElement>(null)

  const [visibleCount, setVisibleCount] = useState(data.length)
  const [isAnyHovered, setIsAnyHovered] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const activeCategory = 'all'
  const activeCategoryIndex = data.findIndex((cat) => cat.slug === activeCategory)
  const isActiveCategoryHidden = activeCategoryIndex >= visibleCount && activeCategoryIndex !== -1

  useEffect(() => {
    const calculateVisible = () => {
      if (!containerRef.current || !measuerRef.current || !viewAllRef.current) return

      const containerWidth = containerRef.current.offsetWidth
      const viewAllWidth = viewAllRef.current.offsetWidth
      const availableWidth = containerWidth - viewAllWidth

      const items = Array.from(measuerRef.current.children)
      let totalWidth = 0
      let visible = 0

      for (const item of items) {
        const width = item.getBoundingClientRect().width

        if (totalWidth + width > availableWidth) break

        totalWidth += width
        visible++
      }

      setVisibleCount(visible)
    }

    const resizeObserver = new ResizeObserver(calculateVisible)
    resizeObserver.observe(containerRef.current!)

    return () => resizeObserver.disconnect()
  }, [data.length])
  return (
    <div className="relative w-full">
      {/* Categoirs Sidebar */}
      <CategoriesSidebar data={data} open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />
      {/* Hidden items */}
      <div
        ref={measuerRef}
        className="absolute opacity-0 pointer-events-none flex"
        style={{ position: 'fixed', top: -9999, left: -9999 }}
      >
        {data.map((category) => (
          <div key={category.id}>
            <CategoryDropdown
              category={category}
              isActive={activeCategory === category.slug}
              isNavigationHovered={false}
            />
          </div>
        ))}
      </div>

      {/* Visible Items */}
      <div
        ref={containerRef}
        onMouseEnter={() => setIsAnyHovered(true)}
        onMouseLeave={() => setIsAnyHovered(false)}
        className="flex flex-nowrap items-center"
      >
        {data.slice(0, visibleCount).map((category) => (
          <div key={category.id}>
            <CategoryDropdown
              category={category}
              isActive={activeCategory === category.slug}
              isNavigationHovered={isAnyHovered}
            />
          </div>
        ))}

        <div ref={viewAllRef} className="shrink-0">
          <Button
            onClick={() => setIsSidebarOpen(true)}
            className={cn(
              'h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white hover:border-primary text-black',
            )}
          >
            View All
            <ListFilterIcon className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}
