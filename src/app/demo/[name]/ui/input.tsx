import { Input } from "@/components/ui/input";

export const input = {
  name: "input",
  components: {
    Email: (
      <div className="w-75 ml-2">
        <Input type="email" placeholder="Email" />
      </div>
    ),
    Text: (
      <div className="w-75 ml-2">
        <Input type="text" placeholder="Text" aria-invalid="true" />
      </div>
    ),
    Password: (
      <div className="w-75 ml-2">
        <Input type="password" placeholder="Password" />
      </div>
    ),
    File: (
      <div className="w-75 ml-2">
        <Input type="file" placeholder="File" />
      </div>
    ),
    Disabled: (
      <div className="w-75 ml-2">
        <Input disabled placeholder="Disabled" />
      </div>
    ),
  },
};
