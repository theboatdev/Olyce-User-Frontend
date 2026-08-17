import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const JOURNEYS = [
  {
    id: 1,
    title: "Echoes of the Emerald Isle",
    category: "Heritage & Wildlife",
    date: "June 2026",
    image: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80",
    excerpt: "A profound exploration into the ancient ruins of Sigiriya, blending history with the untouched elegance of Sri Lanka's cultural heart.",
    content: [
      { type: 'paragraph', text: "The ascent begins before dawn. As the first rays of sunlight pierce through the mist, the colossal Lion Rock emerges from the emerald canopy. This is Sigiriya, a testament to ancient engineering and architectural grandeur, rising nearly 200 meters above the surrounding plains." },
      { type: 'quote', text: "There is an ethereal quality to the silence here, broken only by the wind whispering through centuries-old ruins." },
      { type: 'paragraph', text: "Wandering through the water gardens, one can only marvel at the sophisticated hydraulic systems that still function today. The frescoes of the celestial maidens, painted halfway up the rock face, retain a vibrancy that defies time." },
      { type: 'image', url: "https://images.unsplash.com/photo-1549417229-aa67d3263c09?auto=format&fit=crop&q=80", caption: "The ancient water gardens at the base of Sigiriya" },
      { type: 'paragraph', text: "Beyond the rock fortress, the cultural triangle unfolds. Polonnaruwa's carved stone temples and Anuradhapura's sacred stupas offer a journey back in time, while luxury eco-lodges nested in the jungle provide a sanctuary of modern comfort amidst historical splendor." }
    ]
  },
  {
    id: 2,
    title: "Whispers of the Tea Valleys",
    category: "Luxury Retreat",
    date: "July 2026",
    image: "https://images.unsplash.com/photo-1526462706352-70b9ebf17227?auto=format&fit=crop&q=80",
    excerpt: "Wake up to misty mornings overlooking endless green estates. Discover the art of Ceylon tea while staying in restored colonial bungalows.",
    content: [
      { type: 'paragraph', text: "The air changes as you ascend into the central highlands. It becomes crisp, carrying the delicate, earthy scent of tea leaves. Here, amidst rolling hills carpeted in vibrant green, lies the heart of Ceylon's tea country." },
      { type: 'quote', text: "In the Hill Country, time slows down to the rhythmic picking of tea leaves and the gentle pour of a perfect cup." },
      { type: 'paragraph', text: "Staying in a restored planter's bungalow offers a glimpse into a bygone era. Four-poster beds, roaring fireplaces, and dedicated butlers create an atmosphere of refined colonial elegance. Mornings begin with a pot of single-estate tea, served on the veranda as the valley mist slowly dissipates." },
      { type: 'image', url: "https://images.unsplash.com/photo-1590412351239-9523cb0b7190?auto=format&fit=crop&q=80", caption: "Endless rolling tea estates in Nuwara Eliya" },
      { type: 'paragraph', text: "Days are spent exploring the estates, learning the intricate process of tea making from leaf to cup, and taking scenic train rides across dramatic viaducts and through mountain tunnels." }
    ]
  },
  {
    id: 3,
    title: "Tides of the Southern Edge",
    category: "Coastal Escapes",
    date: "August 2026",
    image: "https://images.unsplash.com/photo-1546890975-7596e98cd928?auto=format&fit=crop&q=80",
    excerpt: "Where the azure Indian Ocean meets untouched golden shores. Experience marine wildlife and exclusive beachfront luxury like never before.",
    content: [
      { type: 'paragraph', text: "The southern coast of Sri Lanka is a ribbon of golden sand kissed by the turquoise waters of the Indian Ocean. It is a place where palm-fringed bays hide boutique luxury villas and the rhythm of the waves dictates the pace of life." },
      { type: 'quote', text: "The ocean here doesn't just meet the land; it embraces it in a timeless dance of tide and time." },
      { type: 'paragraph', text: "Just off the coast of Mirissa, the deep waters drop away, creating a highway for migrating blue whales. Setting out at sunrise on a private catamaran offers the breathtaking opportunity to witness these gentle giants in their natural habitat." },
      { type: 'image', url: "https://images.unsplash.com/photo-1537233219-c603a116bc35?auto=format&fit=crop&q=80", caption: "Untouched golden shores along the southern edge" },
      { type: 'paragraph', text: "Back on land, the fortified city of Galle awaits. Wandering through its narrow, cobbled streets reveals a vibrant blend of European architecture and South Asian traditions, with chic cafes and hidden courtyards tucked behind coral-stone walls." }
    ]
  },
  {
    id: 4,
    title: "The Safari Chronicle",
    category: "Wild Encounters",
    date: "September 2026",
    image: "https://images.unsplash.com/photo-1544641619-3382fb5a388b?auto=format&fit=crop&q=80",
    excerpt: "Venture deep into Yala for intimate encounters with leopards. A journey that balances thrilling wilderness with ethereal comforts.",
    content: [
      { type: 'paragraph', text: "As the afternoon sun begins to dip, painting the sky in strokes of amber and violet, the wilderness of Yala National Park comes alive. This is the domain of the elusive Sri Lankan leopard, a creature of unmatched grace and power." },
      { type: 'quote', text: "In the wild, luxury is not just comfort; it is the privilege of bearing witness to nature's most intimate moments." },
      { type: 'paragraph', text: "Luxury tented camps offer a seamless immersion into this rugged landscape. Safaris are led by expert rangers who read the bush like a book, tracking paw prints in the dust and listening to the alarm calls of langur monkeys." },
      { type: 'image', url: "https://images.unsplash.com/photo-1555138128-d8869c3a38ec?auto=format&fit=crop&q=80", caption: "An elusive leopard resting in the branches of Yala" },
      { type: 'paragraph', text: "Returning to camp means swapping stories around a roaring fire, dining under a canopy of stars, and falling asleep to the distant, untamed sounds of the jungle." }
    ]
  }
]

export function generateStaticParams() {
  return JOURNEYS.map((journey) => ({
    id: journey.id.toString(),
  }))
}

export default function JourneyDetailPage({ params }: { params: { id: string } }) {
  const journey = JOURNEYS.find(j => j.id.toString() === params.id)
  
  if (!journey) {
    notFound()
  }

  return (
    <>
      <Navbar forceSolid={true} />
      
      <main className="flex-grow bg-background pt-32 pb-24">
        <article className="max-w-container-max mx-auto px-margin-mobile md:px-lg">
          {/* Article Header */}
          <header className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-on-surface/50">{journey.category}</span>
              <span className="w-1 h-1 rounded-full bg-outline-variant/40" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-on-surface/40">{journey.date}</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-on-surface leading-tight mb-6">
              {journey.title}
            </h1>
            <p className="text-on-surface/60 text-base md:text-lg font-serif italic max-w-2xl mx-auto leading-relaxed">
              "{journey.excerpt}"
            </p>
          </header>

          {/* Hero Image */}
          <div className="w-full aspect-[16/9] md:aspect-[2.5/1] relative mb-12 md:mb-16 overflow-hidden rounded-sm">
            <img 
              src={journey.image} 
              alt={journey.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Article Content */}
          <div className="max-w-3xl mx-auto flex flex-col gap-8 md:gap-10">
            {journey.content.map((block, index) => {
              if (block.type === 'paragraph') {
                return (
                  <p key={index} className="text-on-surface/75 text-base md:text-lg leading-relaxed font-sans">
                    {block.text}
                  </p>
                )
              }
              
              if (block.type === 'quote') {
                return (
                  <blockquote key={index} className="my-6 md:my-8">
                    <p className="font-serif text-2xl md:text-3xl text-on-surface leading-snug text-center italic">
                      "{block.text}"
                    </p>
                    <div className="w-12 h-px bg-outline-variant/40 mx-auto mt-6" />
                  </blockquote>
                )
              }

              if (block.type === 'image') {
                return (
                  <figure key={index} className="my-6 md:my-8 w-full md:w-[110%] md:-ml-[5%]">
                    <div className="aspect-[16/9] relative mb-3 rounded-sm overflow-hidden">
                      <img 
                        src={block.url} 
                        alt={block.caption}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    <figcaption className="text-center text-[10px] uppercase tracking-[0.25em] text-on-surface/50 font-semibold">
                      {block.caption}
                    </figcaption>
                  </figure>
                )
              }

              return null;
            })}
          </div>

          {/* Back to Journeys */}
          <div className="max-w-3xl mx-auto mt-16 md:mt-20 pt-8 border-t border-outline-variant/20 text-center">
            <Link 
              href="/journeys"
              className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] font-bold text-on-surface hover:text-on-surface/60 transition-colors"
            >
              <span className="text-base leading-none transform rotate-180">→</span>
              Return to Journal
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </>
  )
}
