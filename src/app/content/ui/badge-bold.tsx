import { Badge } from "@/components/ui/badge";

export default function BoldBadgeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="bold">Bold Neutral</Badge>
      <Badge variant="bold" colorScheme="primary">
        Bold Primary
      </Badge>
      <Badge variant="bold" colorScheme="danger">
        Bold Danger
      </Badge>
      <Badge variant="bold" colorScheme="success">
        Bold Success
      </Badge>
      <Badge variant="bold" colorScheme="warning">
        Bold Warning
      </Badge>
      <Badge variant="bold" colorScheme="yellow">
        Bold Yellow
      </Badge>
      <Badge variant="bold" colorScheme="teal">
        Bold Teal
      </Badge>
      <Badge variant="bold" colorScheme="cyan">
        Bold Cyan
      </Badge>
      <Badge variant="bold" colorScheme="blue">
        Bold Blue
      </Badge>
      <Badge variant="bold" colorScheme="pink">
        Bold Pink
      </Badge>
    </div>
  );
}
