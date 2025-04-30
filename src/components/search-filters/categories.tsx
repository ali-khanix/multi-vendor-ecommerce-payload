'use client'

import { act, useEffect, useRef, useState } from 'react'
import { CategoryDropdown } from './category-dropdown'
import { CustomCategory } from '@/app/(frontend)/(home)/types'

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
      <div className="flex flex-nowrap items-center">
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
    </div>
  )
}
