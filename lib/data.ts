export interface ItineraryDay {
  day: string
  description: string
  image?: { _id: string; url: string }
  location?: { lat: number; lng: number; name?: string }
}

export interface Hotel {
  name: string
  category: string
  description: string
  image?: { _id: string; url: string }
}

export interface Package {
  _id: string
  name: string
  slug: string
  duration: string
  category?: string
  priceStandard: number
  pricePremium: number
  description?: string
  images: { asset: { _id: string; url: string } }[]
  itinerary?: ItineraryDay[]
  included?: string[]
  notIncluded?: string[]
  standardHotel?: Hotel
  premiumHotel?: Hotel
  mapImage?: { _id: string; url: string }
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Transform backend package to frontend package interface
function transformPackage(dbPkg: any): Package {
  const images = [];
  const heroUrl = dbPkg.heroImage?.url;
  
  // Use heroImage as first image if available
  if (heroUrl) {
    images.push({ asset: { _id: dbPkg.heroImage.public_id || 'hero', url: heroUrl } });
  }
  
  // Add gallery images, skipping any that duplicate the hero image
  if (dbPkg.gallery && dbPkg.gallery.length > 0) {
    dbPkg.gallery.forEach((img: any) => {
      if (img.url && img.url !== heroUrl) {
        images.push({ asset: { _id: img.public_id || Math.random().toString(), url: img.url } });
      }
    });
  }

  // If no images at all, add a placeholder
  if (images.length === 0) {
    images.push({ asset: { _id: 'placeholder', url: 'https://images.unsplash.com/photo-1586500036706-41963de24d8b?w=800' } });
  }

  return {
    _id: dbPkg._id || dbPkg.slug,
    name: dbPkg.name,
    slug: dbPkg.slug,
    duration: `${dbPkg.durationDays || 7} days`,
    category: dbPkg.category || 'Cultural',
    priceStandard: dbPkg.priceStandard || 0,
    pricePremium: dbPkg.pricePremium || 0,
    description: dbPkg.description || '',
    images,
    itinerary: dbPkg.itinerary?.map((day: any) => ({
      day: day.day,
      description: day.description,
      image: day.image ? { _id: day.image.public_id || 'img', url: day.image.url } : undefined,
      location: day.location || undefined
    })) || [],
    included: dbPkg.included || [],
    notIncluded: dbPkg.notIncluded || [],
    standardHotel: dbPkg.standardHotel ? {
      name: dbPkg.standardHotel.name,
      category: dbPkg.standardHotel.category,
      description: dbPkg.standardHotel.description,
      image: dbPkg.standardHotel.image ? { _id: dbPkg.standardHotel.image.public_id || 'h-s', url: dbPkg.standardHotel.image.url } : undefined
    } : undefined,
    premiumHotel: dbPkg.premiumHotel ? {
      name: dbPkg.premiumHotel.name,
      category: dbPkg.premiumHotel.category,
      description: dbPkg.premiumHotel.description,
      image: dbPkg.premiumHotel.image ? { _id: dbPkg.premiumHotel.image.public_id || 'h-p', url: dbPkg.premiumHotel.image.url } : undefined
    } : undefined,
    mapImage: dbPkg.mapImage ? { _id: dbPkg.mapImage.public_id || 'map', url: dbPkg.mapImage.url } : undefined,
  };
}

export async function getPackages(): Promise<Package[]> {
  try {
    const res = await fetch(`${API_URL}/packages`, { next: { revalidate: 0 } });
    if (!res.ok) {
      console.error('Failed to fetch packages', res.status);
      return [];
    }
    const data = await res.json();
    return data.filter((p: any) => p.status === 'published' || !p.status).map(transformPackage);
  } catch (error) {
    console.error('Error fetching packages:', error);
    return [];
  }
}

export async function getPackageBySlug(slug: string): Promise<Package | undefined> {
  try {
    const res = await fetch(`${API_URL}/packages/${slug}`, { next: { revalidate: 0 } });
    if (!res.ok) {
      if (res.status === 404) return undefined;
      console.error(`Failed to fetch package ${slug}`, res.status);
      return undefined;
    }
    const data = await res.json();
    return transformPackage(data);
  } catch (error) {
    console.error(`Error fetching package ${slug}:`, error);
    return undefined;
  }
}
