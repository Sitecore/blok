import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AvatarInteractiveDemo() {
  return (
    <div
      className="*:data-[slot=avatar]:ring-background flex -space-x-2 hover:space-x-1
            *:data-[slot=avatar]:size-12 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale
            *:data-[slot=avatar]:transition-all *:data-[slot=avatar]:duration-300 *:data-[slot=avatar]:ease-in-out"
    >
      <Avatar>
        <AvatarImage
          src="https://cloudfront-us-east-1.images.arcpublishing.com/opb/UODRDCE3KTLWUWUHHRETSAXL7U.jpg"
          alt="Spongebob"
        />
        <AvatarFallback>SB</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="/patrick-star.png" alt="patrick star" />
        <AvatarFallback>PS</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="/squidward.jpg" alt="Squidward" />
        <AvatarFallback>ST</AvatarFallback>
      </Avatar>
    </div>
  );
}
