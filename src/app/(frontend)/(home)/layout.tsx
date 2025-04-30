import configPromise from '@payload-config'
import { getPayload } from 'payload'

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import SearchFilters from '@/components/search-filters'
import { Category } from '@/payload-types'
import { CustomCategory } from './types'

interface Props {
  children: React.ReactNode
}

const Layout = async ({ children }: Props) => {
  const payload = await getPayload({
    config: configPromise,
  })

  const data = await payload.find({
    collection: 'categories',
    depth: 1, // Populate subcategories
    pagination: false,
    where: {
      parent: {
        exists: false,
      },
    },
    sort: 'name',
  })

  const formattedData: CustomCategory[] = data.docs.map((doc) => ({
    ...doc,
    subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
      // Because of "depth: 1" we are confident "doc" will be a type of "category"
      ...(doc as Category),
      subcategories: undefined,
    })),
  }))

  return (
    <main>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <SearchFilters data={formattedData} />
        <div className="flex-1 bg-[#f3f3f3]">{children}</div>
        <Footer />
      </div>
    </main>
  )
}

export default Layout
