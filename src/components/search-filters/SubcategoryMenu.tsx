import { Category } from '@/payload-types'
import Link from 'next/link'

interface Props {
  category: Category
  isOpen: boolean
  position: { top: number; left: number }
}

const SubcategoryMenu = ({ category, isOpen, position }: Props) => {
  if (!isOpen || !category.subcategories || category.subcategories.length === 0) {
    return null
  }

  const backgroundColor = category.color || '#f5f5f5'
  //   const test = category.subcategories.docs?.map((cat) => {
  //     console.log(cat)
  //   })
  //   console.log(test)

  return (
    <div className="fixed z-100" style={{ top: position.top, left: position.left }}>
      {/* Invisible bridge */}
      <div className="h-3 w-60" />
      <div
        style={{ backgroundColor }}
        className="w-60 text-black rounded-md overflow-hidden border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[2px] -translate-y-[2px]"
      >
        <div className="">
          {category.subcategories.docs?.map((subcategory) => (
            <Link
              key={subcategory.slug}
              href={'/'}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center underline font-medium"
            >
              {subcategory.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SubcategoryMenu
