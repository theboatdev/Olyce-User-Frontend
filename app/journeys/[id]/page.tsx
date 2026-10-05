import Footer from '../../components/Footer'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const JOURNEYS = [
  {
    id: 1,
    title: 'Echoes of the Emerald Isle',
    category: 'Heritage & Wildlife',
    date: 'June 2026',
    image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80',
    excerpt:
      "A profound exploration into the ancient ruins of Sigiriya, blending history with the untouched elegance of Sri Lanka's cultural heart.",
    content: [
      {
        type: 'paragraph',
        text: 'The ascent begins before dawn. As the first rays of sunlight pierce through the mist, the colossal Lion Rock emerges from the emerald canopy. This is Sigiriya, a testament to ancient engineering and architectural grandeur, rising nearly 200 meters above the surrounding plains.',
      },
      {
        type: 'quote',
        text: 'There is an ethereal quality to the silence here, broken only by the wind whispering through centuries-old ruins.',
      },
      {
        type: 'paragraph',
        text: 'Wandering through the water gardens, one can only marvel at the sophisticated hydraulic systems that still function today. The frescoes of the celestial maidens, painted halfway up the rock face, retain a vibrancy that defies time.',
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1549417229-aa67d3263c09?auto=format&fit=crop&q=80',
        caption: 'The ancient water gardens at the base of Sigiriya',
      },
      {
        type: 'paragraph',
        text: "Beyond the rock fortress, the cultural triangle unfolds. Polonnaruwa's carved stone temples and Anuradhapura's sacred stupas offer a journey back in time, while luxury eco-lodges nested in the jungle provide a sanctuary of modern comfort amidst historical splendor.",
      },
    ],
  },
  {
    id: 2,
    title: 'Whispers of the Tea Valleys',
    category: 'Luxury Retreat',
    date: 'July 2026',
    image: 'https://images.unsplash.com/photo-1526462706352-70b9ebf17227?auto=format&fit=crop&q=80',
    excerpt:
      'Wake up to misty mornings overlooking endless green estates. Discover the art of Ceylon tea while staying in restored colonial bungalows.',
    content: [
      {
        type: 'paragraph',
        text: "The air changes as you ascend into the central highlands. It becomes crisp, carrying the delicate, earthy scent of tea leaves. Here, amidst rolling hills carpeted in vibrant green, lies the heart of Ceylon's tea country.",
      },
      {
        type: 'quote',
        text: 'In the Hill Country, time slows down to the rhythmic picking of tea leaves and the gentle pour of a perfect cup.',
      },
      {
        type: 'paragraph',
        text: "Staying in a restored planter's bungalow offers a glimpse into a bygone era. Four-poster beds, roaring fireplaces, and dedicated butlers create an atmosphere of refined colonial elegance. Mornings begin with a pot of single-estate tea, served on the veranda as the valley mist slowly dissipates.",
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1590412351239-9523cb0b7190?auto=format&fit=crop&q=80',
        caption: 'Endless rolling tea estates in Nuwara Eliya',
      },
      {
        type: 'paragraph',
        text: 'Days are spent exploring the estates, learning the intricate process of tea making from leaf to cup, and taking scenic train rides across dramatic viaducts and through mountain tunnels.',
      },
    ],
  },
  {
    id: 3,
    title: 'Tides of the Southern Edge',
    category: 'Coastal Escapes',
    date: 'August 2026',
    image: 'https://images.unsplash.com/photo-1546890975-7596e98cd928?auto=format&fit=crop&q=80',
    excerpt:
      'Where the azure Indian Ocean meets untouched golden shores. Experience marine wildlife and exclusive beachfront luxury like never before.',
    content: [
      {
        type: 'paragraph',
        text: 'The southern coast of Sri Lanka is a ribbon of golden sand kissed by the turquoise waters of the Indian Ocean. It is a place where palm-fringed bays hide boutique luxury villas and the rhythm of the waves dictates the pace of life.',
      },
      {
        type: 'quote',
        text: "The ocean here doesn't just meet the land; it embraces it in a timeless dance of tide and time.",
      },
      {
        type: 'paragraph',
        text: 'Just off the coast of Mirissa, the deep waters drop away, creating a highway for migrating blue whales. Setting out at sunrise on a private catamaran offers the breathtaking opportunity to witness these gentle giants in their natural habitat.',
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1537233219-c603a116bc35?auto=format&fit=crop&q=80',
        caption: 'Untouched golden shores along the southern edge',
      },
      {
        type: 'paragraph',
        text: 'Back on land, the fortified city of Galle awaits. Wandering through its narrow, cobbled streets reveals a vibrant blend of European architecture and South Asian traditions, with chic cafes and hidden courtyards tucked behind coral-stone walls.',
      },
    ],
  },
  {
    id: 4,
    title: 'The Safari Chronicle',
    category: 'Wild Encounters',
    date: 'September 2026',
    image: 'https://images.unsplash.com/photo-1544641619-3382fb5a388b?auto=format&fit=crop&q=80',
    excerpt:
      'Venture deep into Yala for intimate encounters with leopards. A journey that balances thrilling wilderness with ethereal comforts.',
    content: [
      {
        type: 'paragraph',
        text: "As the afternoon sun begins to dip, painting the sky in strokes of amber and violet, the wilderness of Yala National Park comes alive. This is the domain of the elusive Sri Lankan leopard, a creature of unmatched grace and power.",
      },
      {
        type: 'quote',
        text: "In the wild, luxury is not just comfort; it is the privilege of bearing witness to nature's most intimate moments.",
      },
      {
        type: 'paragraph',
        text: 'Luxury tented camps offer a seamless immersion into this rugged landscape. Safaris are led by expert rangers who read the bush like a book, tracking paw prints in the dust and listening to the alarm calls of langur monkeys.',
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1555138128-d8869c3a38ec?auto=format&fit=crop&q=80',
        caption: 'An elusive leopard resting in the branches of Yala',
      },
      {
        type: 'paragraph',
        text: 'Returning to camp means swapping stories around a roaring fire, dining under a canopy of stars, and falling asleep to the distant, untamed sounds of the jungle.',
      },
    ],
  },
]

export function generateStaticParams() {
  return JOURNEYS.map((journey) => ({
    id: journey.id.toString(),
  }))
}

export default async function JourneyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const journey = JOURNEYS.find((j) => j.id.toString() === id)

  if (!journey) {
    notFound()
  }

  return (
    <div className="olyce-home">
      <main className="grow bg-white pt-24 sm:pt-28 pb-16 sm:pb-24">
        <article className="max-w-[1280px] mx-auto px-5 sm:px-8">
          <header className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-5">
              <span className="text-[11px] sm:text-[12px] uppercase tracking-[1.2px] font-semibold text-[var(--gsm-gold)]">
                {journey.category}
              </span>
              <span className="w-1 h-1 rounded-full bg-[var(--gsm-body)]/40" />
              <span className="text-[11px] sm:text-[12px] uppercase tracking-[1.2px] text-[var(--gsm-body)]">
                {journey.date}
              </span>
            </div>
            <h1 className="section-title mb-4 sm:mb-5">{journey.title}</h1>
            <p className="text-center text-[16px] sm:text-[18px] font-light italic text-[var(--gsm-body)] max-w-2xl mx-auto leading-relaxed">
              “{journey.excerpt}”
            </p>
          </header>

          <div className="w-full aspect-[16/10] sm:aspect-[2.4/1] relative mb-10 sm:mb-14 overflow-hidden rounded-[10px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={journey.image}
              alt={journey.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          <div className="max-w-3xl mx-auto flex flex-col gap-6 sm:gap-8">
            {journey.content.map((block, index) => {
              if (block.type === 'paragraph') {
                return (
                  <p
                    key={index}
                    className="text-[15px] sm:text-[16px] md:text-[17px] leading-7 sm:leading-8 font-light text-[var(--gsm-body)]"
                  >
                    {block.text}
                  </p>
                )
              }

              if (block.type === 'quote') {
                return (
                  <blockquote key={index} className="my-2 sm:my-4 py-5 sm:py-6 border-y border-[var(--gsm-teal)]/15">
                    <p className="text-center font-heading text-[20px] sm:text-[24px] md:text-[28px] font-semibold text-[var(--gsm-teal)] leading-snug">
                      “{block.text}”
                    </p>
                  </blockquote>
                )
              }

              if (block.type === 'image') {
                return (
                  <figure key={index} className="my-2 sm:my-4 w-full">
                    <div className="aspect-[16/9] relative mb-3 rounded-[10px] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={block.url}
                        alt={block.caption}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    <figcaption className="text-center text-[11px] uppercase tracking-[1.2px] text-[var(--gsm-body)] font-semibold">
                      {block.caption}
                    </figcaption>
                  </figure>
                )
              }

              return null
            })}
          </div>

          <div className="max-w-3xl mx-auto mt-12 sm:mt-16 pt-8 border-t border-black/10 text-center">
            <Link href="/journeys" className="btn-gold-sm">
              <span aria-hidden>←</span> Return to Journal
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}
