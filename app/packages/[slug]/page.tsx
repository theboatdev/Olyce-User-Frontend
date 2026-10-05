import { notFound } from 'next/navigation'
import PackageDetailView from '../../components/PackageDetailView'
import Footer from '../../components/Footer'
import { getPackageBySlug } from '../../../lib/data'

// Force dynamic rendering: this page always fetches fresh data
export const dynamic = 'force-dynamic'

export default async function PackagePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;

  if (!resolvedParams.slug) {
    notFound();
  }

  const packageData = await getPackageBySlug(resolvedParams.slug);

  if (!packageData) {
    notFound();
  }

  return (
    <>
      <main className="min-h-screen bg-background text-on-background pt-20 sm:pt-24 md:pt-32 pb-24 sm:pb-32">
        <PackageDetailView packageData={packageData} />
      </main>
      <Footer />
    </>
  )
}

