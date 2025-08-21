import { blockItems } from "@/lib/registry-items"
import ComponentsBox from "@/components/ui/componentsBox"
import { HeroSection } from "@/components/heroSection"

export default function Page() {
  // Sort alphabetically
  const sortedData = [...blockItems].sort((a, b) => a.label.localeCompare(b.label))

  // Group by first letter
  const groupedData: Record<string, typeof sortedData> = {}
  sortedData.forEach((item) => {
    const firstLetter = item.label[0].toUpperCase()
    if (!groupedData[firstLetter]) {
      groupedData[firstLetter] = []
    }
    groupedData[firstLetter].push(item)
  })

  return (
    <div>
      <HeroSection
        title="Bloks"
        description="Bloks (Blocks), are building blocks of larger UI entities. Copy and paste bloks into your apps to build out fuller Sitecore UIs faster. "
      />

      <div className="bg-secondary mt-15 min-h-screen w-full md:mt-10 pb-20">
        <div className="mx-6 pt-4 md:mx-12 md:pt-8 lg:mx-40 lg:pt-15">
          <div className="space-y-10">
            {Object.entries(groupedData).map(([letter, items]) => (
              <div key={letter}>
                <h2 className="text-foreground pb-4 text-3xl font-semibold md:text-4xl">
                  {letter}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 w-full 2xl:grid-cols-6">
                  {items.map((item) => (
                    <ComponentsBox
                      key={item.label}
                      name={item.label}
                      imageSrc="/Blok-site-Illustration.png"
                      href={item.href}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
