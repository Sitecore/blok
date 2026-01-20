import { CircularProgress } from "@/components/ui/circular-progress";

export default function CircularProgressWithTextDemo() {
    return (
        <div className="flex items-start justify-center w-28">
            <CircularProgress variant="circular" size="md" message="Loading..." />
        </div>
    )
}