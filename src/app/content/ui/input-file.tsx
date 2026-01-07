import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function InputFileDemo() {
    return (
        <div className="grid gap-2 w-75 ml-2">
            <Label htmlFor="file-input">File Upload</Label>
            <Input type="file" id="file-input" aria-label="File Upload" autoComplete="off" />
        </div>
    );
}