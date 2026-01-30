import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function InputDemo() {
  return (
    <div className="flex grid-cols-2 w-full gap-4">
      <h2 className="font-semibold text-4xl wrap-break-words">Input</h2>
      <div className="grid flex-col gap-4">
        {/* Default Input */}
        <div id="input-default">
          <div className="grid gap-2 w-75 ml-2">
            <Label htmlFor="input">Name</Label>
            <Input type="text" id="input" placeholder="Enter your name" aria-label="Name" />
          </div>
        </div>

        {/* Email Input */}
        <div id="input-email">
          <div className="grid gap-2 w-75 ml-2">
            <Label htmlFor="email-input">Email</Label>
            <Input type="email" id="email-input" placeholder="Enter your email" aria-label="Email" autoComplete="email" />
          </div>
        </div>

        {/* Text Input */}
        <div id="input-text">
          <div className="grid gap-2 w-75 ml-2">
            <Label htmlFor="text-input">Text Input</Label>
            <Input type="text" id="text-input" placeholder="Enter text" aria-label="Text Input" aria-invalid="true" autoComplete="off" />
          </div>
        </div>
      </div>

      <div className="grid flex-col gap-4">
        {/* Password Input */}
        <div id="input-password">
          <div className="grid gap-2 w-75 ml-2">
            <Label htmlFor="password-input">Password</Label>
            <Input type="password" id="password-input" aria-label="Password" placeholder="Enter your password" autoComplete="current-password" />
          </div>
        </div>

        {/* File Upload Input */}
        <div id="input-file">
          <div className="grid gap-2 w-75 ml-2">
            <Label htmlFor="file-input">File Upload</Label>
            <Input type="file" id="file-input" aria-label="File Upload" autoComplete="off" />
          </div>
        </div>

        {/* Disabled Input */}
        <div id="input-disabled">
          <div className="grid gap-2 w-75 ml-2">
            <Label htmlFor="disabled-input">Disabled Input</Label>
            <Input disabled id="disabled-input" aria-label="Disabled Input" placeholder="This input is disabled" autoComplete="off" />
          </div>
        </div>
      </div>
    </div>
  );
}