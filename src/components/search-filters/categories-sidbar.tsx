import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { ScrollArea } from '../ui/scroll-area'

import { CustomCategory } from '@/app/(frontend)/(home)/types'

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  data: CustomCategory[]
}

export const CategoriesSidebar = ({ open, onOpenChange, data }: Props) => {
  const router = useRouter()
  const [parentCategories, setparentCategories] = useState<CustomCategory[] | null>(null)

  const [selectedCategory, setSelectedCategory] = useState<CustomCategory[] | null>(null)

  // If we have parent categories, show thos, otherwise show root categories

  const currentCategories = parentCategories ?? data ?? []

  const handleCategoryClick = (category: CustomCategory) => {
    if (category.subcategories && category.subcategories.length > 0) {
      setparentCategories(category.subcategories as CustomCategory[])
      setSelectedCategory(category)
    } else {
      // this is a leaf category
      if (parentCategories && selectedCategory) {
        router.push(`/${selectedCategory.slug}/${category.slug}`)
      }
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="p-0 transition-none"
        style={{ backgroundColor: 'white' }}
      >
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Categories</SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {parentCategories && (
            <button
              onClick={() => {}}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium cursor-pointer"
            >
              <ChevronLeftIcon className="size-4 mr-2" />
              Back
            </button>
          )}

          {currentCategories.map((category) => (
            <button
              onClick={() => handleCategoryClick(category)}
              key={category.slug}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center text-base font-medium cursor-pointer"
            >
              {category.name}
              {category.subcategories && category.subcategories.length > 0 && (
                <ChevronRightIcon className="size-4" />
              )}
            </button>
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
