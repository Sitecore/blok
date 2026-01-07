import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function InputEmailDemo() {
    return (
        <div className="grid gap-2 w-75 ml-2">
            <Label htmlFor="email-input">Email</Label>
            <Input type="email" id="email-input" placeholder="Enter your email" aria-label="Email" autoComplete="email" />
        </div>
    );
}