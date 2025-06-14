import { CustomCategory } from '@/app/(frontend)/(home)/types'
import { Categories } from './categories'
import SearchInput from './SearchInput'

interface Props {
  data: CustomCategory[]
}

const SearchFilters = ({ data }: Props) => {
  return (
    <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full">
      <SearchInput data={data} />
      <div className="hidden xl:block">
        <Categories data={data} />
      </div>
    </div>
  )
}

export default SearchFilters
