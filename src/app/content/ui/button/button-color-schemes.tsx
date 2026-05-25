import { Button } from "@/components/ui/button";

export default function ButtonColorSchemeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button colorScheme="primary">Default</Button>
      <Button colorScheme="neutral">Secondary</Button>
      <Button colorScheme="success">Success</Button>
      <Button colorScheme="danger">Danger</Button>
    </div>
  );
}
