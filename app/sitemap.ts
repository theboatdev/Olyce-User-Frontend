import {MetadataRoute} from 'next'
import {headers} from 'next/headers'
import {getPackages} from '../lib/data'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers()
  const host = headersList.get('host') ?? 'localhost:3000'
  const baseUrl = `https://${host}`
  
  const packages = await getPackages()
  
  const packageEntries: MetadataRoute.Sitemap = packages.map((pkg) => ({
    url: `${baseUrl}/packages/${pkg.slug}`,
    lastModified: new Date(),
    priority: 0.8,
    changeFrequency: 'monthly',
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      priority: 1,
      changeFrequency: 'monthly',
    },
    ...packageEntries,
  ]
}
