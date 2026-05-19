import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AvatarDemo() {
  return (
    <Avatar>
      <AvatarImage
        src="https://ca.slack-edge.com/T1S2RKGUA-U015TJJS8MS-b581732f917e-512"
        alt="Frank Grinaert"
      />
      <AvatarFallback className="bg-primary text-primary-foreground">
        <span className="text-xs">CN</span>
      </AvatarFallback>
    </Avatar>
  );
}
