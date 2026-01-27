import { Badge } from "@/components/ui/badge";

export default function BadgeColorSchemesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge>Neutral</Badge>
      <Badge colorScheme="primary">Primary</Badge>
      <Badge colorScheme="danger">Danger</Badge>
      <Badge colorScheme="success">Success</Badge>
      <Badge colorScheme="warning">Warning</Badge>
      <Badge colorScheme="yellow">Yellow</Badge>
      <Badge colorScheme="teal">Teal</Badge>
      <Badge colorScheme="cyan">Cyan</Badge>
      <Badge colorScheme="blue">Blue</Badge>
      <Badge colorScheme="pink">Pink</Badge>
    </div>
  );
}
