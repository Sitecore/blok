import { Button } from "@/registry/new-york/ui/button"

interface ButtonConfig {
  text: string
  variant: string
  className: string
}

interface HeroSectionProps {
  title: string
  description: string
  buttons?: ButtonConfig[]
}

export function HeroSection({ title, description, buttons = [] }: HeroSectionProps) {
  return (
    <div className="mx-6 md:mx-12 lg:mx-60 pt-4 md:pt-8 lg:pt-15 ">
      <div className="flex flex-col space-y-5">
        <h1 className="text-3xl md:text-4xl font-semibold">
          {title}
        </h1>
        <p className="text-muted-foreground w-full md:w-140">
          {description}
        </p>
      </div>
      {buttons.length > 0 && (
        <div className="flex gap-4 pt-5">
          {buttons.map((btn, index) => (
            <Button
              key={index}
              variant={btn.variant as any}
              className={btn.className}
            >
              {btn.text}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}