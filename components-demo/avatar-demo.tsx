import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AvatarDemo() {
  return (
    <div className="grid w-full max-w-xl gap-4">
      <h2 className="font-semibold text-4xl wrap-break-words">Avatar</h2>
      <Avatar>
        <AvatarImage src="https://ca.slack-edge.com/T1S2RKGUA-U015TJJS8MS-b581732f917e-512" alt="Frank Grinaert" />
        <AvatarFallback className="bg-primary text-primary-foreground">
          <span className="text-xs">CN</span>
        </AvatarFallback>
      </Avatar>

    {/* Fallback Avatar */}
      <Avatar>
        <AvatarFallback>BM</AvatarFallback>
      </Avatar>

    {/* Large Avatars */}
      <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:size-12*:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
        <Avatar>
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="https://ca.slack-edge.com/T1S2RKGUA-U015TJJS8MS-b581732f917e-512" alt="Martin Svarrer Christensen" />
          <AvatarFallback>MS</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage
          src="https://avatars.githubusercontent.com/u/126190057"
          alt="Omar Oueslati"
          />
          <AvatarFallback>OO</AvatarFallback>
        </Avatar>
      </div>

    {/* Interactive Avatars */}
      <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 hover:space-x-1 *:data-[slot=avatar]:size-12 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale *:data-[slot=avatar]:transition-all *:data-[slot=avatar]:duration-300 *:data-[slot=avatar]:ease-in-out">
        <Avatar>
          <AvatarImage src="https://cloudfront-us-east-1.images.arcpublishing.com/opb/UODRDCE3KTLWUWUHHRETSAXL7U.jpg" alt="Spongebob" />
          <AvatarFallback>SB</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="/patrick-star.png" alt="patrick star" />
          <AvatarFallback>PS</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage
            src="/squidward.jpg"
            alt="Squidward"
          />
          <AvatarFallback>ST</AvatarFallback>
        </Avatar>
      </div>

    {/* Avatar Menu */}
      <div className="flex items-center gap-4">
      <div className="flex -space-x-2">
        <button className="group relative flex size-12 items-center justify-center rounded-full bg-primary-background text-primary-foreground transition-colors hover:bg-primary hover:text-white">
          <span className="text-3xl font-semibold">+</span>
        </button>
        <Avatar className="size-12 ring-2 ring-background">
          <AvatarImage
            src="https://cloudfront-us-east-1.images.arcpublishing.com/opb/UODRDCE3KTLWUWUHHRETSAXL7U.jpg"
            alt="Spongebob"
          />
          <AvatarFallback>SB</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex -space-x-2">
        <button className="group relative flex size-12 items-center justify-center rounded-full bg-primary-background text-primary-foreground transition-colors hover:bg-primary hover:text-white">
          <span className="text-3xl font-semibold">+</span>
        </button>
        <Avatar className="size-12 ring-2 ring-background">
          <AvatarImage
            src="https://cloudfront-us-east-1.images.arcpublishing.com/opb/UODRDCE3KTLWUWUHHRETSAXL7U.jpg"
            alt="Spongebob"
          />
          <AvatarFallback>SB</AvatarFallback>
        </Avatar>
        <Avatar className="size-12 ring-2 ring-background">
          <AvatarImage src="https://avatars.githubusercontent.com/u/126190057" alt="Omar Oueslati" />
          <AvatarFallback>PS</AvatarFallback>
        </Avatar>
        <Avatar className="size-12 ring-2 ring-background">
          <AvatarImage src="https://ca.slack-edge.com/T1S2RKGUA-U015TJJS8MS-b581732f917e-512" alt="Squidward" />
          <AvatarFallback>ST</AvatarFallback>
        </Avatar>
        <button className="group relative flex size-12 items-center justify-center rounded-full bg-primary-background text-primary-foreground transition-colors hover:bg-primary hover:text-white">
          <span className="text-1xl font-semibold">+3</span>
        </button>
      </div>
    </div>

    </div>
  )
}
