import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Icon } from "@/lib/icon";
import { mdiMagnify } from "@mdi/js";

export default function InputGroupSearchDemo() {
  return (
    <div className="grid w-full max-w-md gap-4">
      <InputGroup>
        <InputGroupInput placeholder="Search..." aria-label="Search" />
        <InputGroupAddon>
          <Icon path={mdiMagnify} size={1} />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
      </InputGroup>
    </div>
  );
}
