import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const avatar = {
  name: "avatar",
  defaultComponent: (
    <Avatar>
      <AvatarImage src="https://ca.slack-edge.com/T1S2RKGUA-U015TJJS8MS-b581732f917e-512" alt="Frank Grinaert" />
      <AvatarFallback className="bg-primary text-primary-foreground">
        <span className="text-xs">CN</span>
      </AvatarFallback>
    </Avatar>
  ),
  usage: [
    `import {\n  Avatar,\n  AvatarFallback,\n  AvatarImage,\n} from "@/components/ui/avatar"`,
    `<Avatar>\n  <AvatarImage src="https://ca.slack-edge.com/T1S2RKGUA-U015TJJS8MS-b581732f917e-512" alt="Frank Grinaert" />\n  <AvatarFallback>\n    <span>CN</span>\n  </AvatarFallback>\n</Avatar>`
  ],
  components: {
    Fallback: (
      <Avatar>
        <AvatarFallback>BM</AvatarFallback>
      </Avatar>
    ),
    Large:(
      <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:size-12 
        *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
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
    ),
    Interactive: (
      <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 hover:space-x-1 
        *:data-[slot=avatar]:size-12 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale 
        *:data-[slot=avatar]:transition-all *:data-[slot=avatar]:duration-300 *:data-[slot=avatar]:ease-in-out">
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
    )
  }
};
