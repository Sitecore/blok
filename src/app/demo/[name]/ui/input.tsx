import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const input = {
  name: "input",
  defaultComponent: (
    <div className="grid gap-2 w-75 ml-2">
      <Label htmlFor="input">Name</Label>
      <Input type="text" id="input" placeholder="Enter your name" aria-label="Name" />
    </div>
  ),
  usage: [
    `import { Input } from "@/components/ui/input";`,
    `<Input />`,
  ],
  components: {
    Email: (
      <div id="input-email" className="grid gap-2 w-75 ml-2">
        <Label htmlFor="email-input">Email</Label>
        <Input type="email" id="email-input" placeholder="Enter your email" aria-label="Email" autoComplete="email" />
      </div>
    ),
    Text: (
      <div id="input-text" className="grid gap-2 w-75 ml-2">
        <Label htmlFor="text-input">Text Input</Label>
        <Input type="text" id="text-input" placeholder="Enter text" aria-label="Text Input" aria-invalid="true" autoComplete="off" />
      </div>
    ),
    Password: (
      <div id="input-password" className="grid gap-2 w-75 ml-2">
        <Label htmlFor="password-input">Password</Label>
        <Input type="password" id="password-input" aria-label="Password" placeholder="Enter your password" autoComplete="current-password" />
      </div>
    ),
    File: (
      <div id="input-file" className="grid gap-2 w-75 ml-2">
        <Label htmlFor="file-input">File Upload</Label>
        <Input type="file" id="file-input" aria-label="File Upload" autoComplete="off" />
      </div>
    ),
    Disabled: (
      <div id="input-disabled" className="grid gap-2 w-75 ml-2">
        <Label htmlFor="disabled-input">Disabled Input</Label>
        <Input disabled id="disabled-input" aria-label="Disabled Input" placeholder="This input is disabled" autoComplete="off" />
      </div>
    ),
  },
};
