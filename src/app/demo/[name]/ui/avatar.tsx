import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const avatar = {
  name: "avatar",
  components: {
    default: (
      <Avatar>
        <AvatarImage src="https://ca.slack-edge.com/T1S2RKGUA-U015TJJS8MS-b581732f917e-512" alt="Frank Grinaert" />
        <AvatarFallback className="bg-primary text-primary-foreground">
          <span className="text-xs">CN</span>
        </AvatarFallback>
      </Avatar>
    ),
    fallback: (
      <Avatar>
        <AvatarFallback>BM</AvatarFallback>
      </Avatar>
    ),
    large:(
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
    interactive: (
      <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 hover:space-x-1 
        *:data-[slot=avatar]:size-12 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale 
        *:data-[slot=avatar]:transition-all *:data-[slot=avatar]:duration-300 *:data-[slot=avatar]:ease-in-out">
        <Avatar>
          <AvatarImage src="https://avatars.githubusercontent.com/u/105914467" alt="Robert Watt" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="https://avatars.githubusercontent.com/u/136078144" alt="Charalampos Vitoros" />
          <AvatarFallback>CV</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage
            src="https://avatars.githubusercontent.com/u/105914470"
            alt="Eric Sitarz"
          />
          <AvatarFallback>ES</AvatarFallback>
        </Avatar>
      </div>
    )
  }
};
