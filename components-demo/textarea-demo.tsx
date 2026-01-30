import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function TextareaDemo() {
  return (
    <div>
      <h2 className="font-semibold text-4xl wrap-break-words">Textarea</h2>
      <div className="grid grid-cols-4 w-full gap-4">
        <div className="flex flex-col gap-4">
          {/* Basic Textarea */}
          <div id="textarea-basic">
            <div className="grid gap-2 m-2">
              <Label htmlFor="basic-textarea">Message</Label>
              <Textarea id="basic-textarea" aria-label="Message" placeholder="Type your message here." />
            </div>
          </div>

          {/* Invalid Textarea */}
          <div id="textarea-invalid">
            <div className="grid gap-2 m-2">
              <Label htmlFor="invalid-textarea">Message</Label>
              <Textarea id="invalid-textarea" placeholder="Type your message here." aria-label="Message" aria-invalid="true" />
            </div>
          </div>
        
          {/* Textarea with Label */}
          <div id="textarea-with-label">
            <div className="grid gap-3 m-2">
              <Label htmlFor="textarea-demo-message">Message</Label>
              <Textarea
                id="textarea-demo-message"
                placeholder="Type your message here."
                aria-label="Message"
                rows={6}
              />
            </div>
          </div>

          {/* Textarea with Label and Description */}
          <div id="textarea-with-label-and-description">
            <div className="grid gap-3 m-2">
              <Label htmlFor="textarea-demo-message-2">
                Message
              </Label>
              <Textarea
                id="textarea-demo-message-2"
                placeholder="Type your message here."
                aria-label="Message"
                rows={6}
              />
              <div className="text-muted-foreground text-sm">
                Type your message and press enter to send.
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {/* Disabled Textarea */}
          <div id="textarea-disabled">
            <div className="grid gap-3 m-2">
              <Label htmlFor="textarea-demo-disabled">Disabled Textarea</Label>
              <Textarea
                id="textarea-demo-disabled"
                placeholder="Type your message here."
                aria-label="Disabled Textarea"
                disabled
              />
            </div>
          </div>

          {/* Small Textarea */}
          <div id="textarea-small">
            <div className="grid gap-3 m-2">
              <Label htmlFor="small-textarea">Small (3 rows)</Label>
              <Textarea
                id="small-textarea"
                placeholder="Small textarea"
                aria-label="Small textarea"
                rows={3}
                className="min-h-[60px]"
              />
            </div>
          </div>

          {/* Large Textarea */}
          <div id="textarea-large">
            <div className="grid gap-3 m-2">
              <Label htmlFor="large-textarea">Large (8 rows)</Label>
              <Textarea
                id="large-textarea"
                placeholder="Large textarea"
                aria-label="Large textarea"
                rows={8}
                className="min-h-[160px]"
              />
            </div>
          </div>

          {/* Textarea with Default Value */}
          <div id="textarea-pre-filled">
            <div className="grid gap-3 m-2">
              <Label htmlFor="textarea-with-value">Pre-filled Textarea</Label>
              <Textarea
                id="textarea-with-value"
                defaultValue="This textarea comes with some pre-filled content. You can edit this text or add more content as needed."
                aria-label="Pre-filled Textarea"
                rows={4}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}