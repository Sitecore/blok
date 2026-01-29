import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AvatarMenuDemo() {
  return (
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
          <AvatarImage
            src="https://avatars.githubusercontent.com/u/126190057"
            alt="Omar Oueslati"
          />
          <AvatarFallback>PS</AvatarFallback>
        </Avatar>
        <Avatar className="size-12 ring-2 ring-background">
          <AvatarImage
            src="https://ca.slack-edge.com/T1S2RKGUA-U015TJJS8MS-b581732f917e-512"
            alt="Squidward"
          />
          <AvatarFallback>ST</AvatarFallback>
        </Avatar>
        <button className="group relative flex size-12 items-center justify-center rounded-full bg-primary-background text-primary-foreground transition-colors hover:bg-primary hover:text-white">
          <span className="text-1xl font-semibold">+3</span>
        </button>
      </div>
    </div>
  );
}
