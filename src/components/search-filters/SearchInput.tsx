interface Props {
  disabled?: boolean
}

import { SearchIcon } from 'lucide-react'
import { Input } from '../ui/input'

const SearchInput = ({ disabled }: Props) => {
  return (
    <div className=" flex gap-4 items-center justify-between w-full">
      <div className="relative w-full">
        <SearchIcon className="absolute size-4 left-4 top-1/2 -translate-1/2 text-neutral-500 " />
        <Input className="pl-8 " placeholder="Search products..." />
      </div>

      {/* TODO: add categories vew all button */}
      {/* TODO: add library button */}
    </div>
  )
}

export default SearchInput
