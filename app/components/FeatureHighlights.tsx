const FEATURES = [
  {
    title: 'Curated Routes',
    description: 'Every itinerary is built around real highlights, not rushed stopovers.',
  },
  {
    title: 'Clear Tiers',
    description: 'Choose Standard or Premium stays with pricing you can compare at a glance.',
  },
  {
    title: 'End to End Support',
    description: 'From your first question to when you land home, our team stays in touch.',
  },
]

export default function FeatureHighlights() {
  return (
    <section className="w-full bg-on-surface text-background">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/15">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="py-8 md:py-10 md:px-8 first:md:pl-0 last:md:pr-0">
              <h3 className="font-headline-md text-lg md:text-xl text-white mb-2">
                {feature.title}
              </h3>
              <p className="font-body-md text-sm md:text-base text-white/70 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
