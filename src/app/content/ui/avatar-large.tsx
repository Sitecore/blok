import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AvatarLargeDemo() {
  return (
    <div
      className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:size-12
            *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale"
    >
      <Avatar>
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage
          src="https://ca.slack-edge.com/T1S2RKGUA-U015TJJS8MS-b581732f917e-512"
          alt="Martin Svarrer Christensen"
        />
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
  );
}
