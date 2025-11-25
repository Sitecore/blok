import { Icons } from "@/components/ui/icon";
import { mdiInformation, mdiInformationOutline } from "@mdi/js";

export default function TestPage() {
    return (
        <div className="w-screen min-h-screen p-10 flex flex-col items-center gap-4">
            <div className="w-1/2 p-12 rounded-lg bg-subtle-bg flex items-center justify-center gap-4">
                <Icons path={mdiInformationOutline} variant="default" />
                <Icons path={mdiInformationOutline} variant="filled" />
            </div>
            <div className="w-1/2 p-12 rounded-lg bg-subtle-bg flex items-center justify-center gap-4">
                <Icons path={mdiInformationOutline} size="sm" />
                <Icons path={mdiInformationOutline} size="md" />
                <Icons path={mdiInformationOutline} size="default" />
                <Icons path={mdiInformationOutline} size="lg" />
            </div>
            <div className="w-1/2 p-12 rounded-lg bg-subtle-bg flex items-center justify-center gap-4">
                <Icons path={mdiInformationOutline} colorScheme="neutral" />
                <Icons path={mdiInformationOutline} colorScheme="danger" />
                <Icons path={mdiInformationOutline} colorScheme="warning" />
                <Icons path={mdiInformationOutline} colorScheme="yellow" />
                <Icons path={mdiInformationOutline} colorScheme="success" />
                <Icons path={mdiInformationOutline} colorScheme="teal" />
                <Icons path={mdiInformationOutline} colorScheme="cyan" />
                <Icons path={mdiInformationOutline} colorScheme="primary" />
                <Icons path={mdiInformationOutline} colorScheme="blue" />
                <Icons path={mdiInformationOutline} colorScheme="pink" />
            </div>
            <div className="w-1/2 p-12 rounded-lg bg-subtle-bg flex items-center justify-center gap-4">
                <Icons path={mdiInformationOutline} variant="filled" colorScheme="neutral" />
                <Icons path={mdiInformationOutline} variant="filled" colorScheme="danger" />
                <Icons path={mdiInformationOutline} variant="filled" colorScheme="warning" />
                <Icons path={mdiInformationOutline} variant="filled" colorScheme="yellow" />
                <Icons path={mdiInformationOutline} variant="filled" colorScheme="success" />
                <Icons path={mdiInformationOutline} variant="filled" colorScheme="teal" />
                <Icons path={mdiInformationOutline} variant="filled" colorScheme="cyan" />
                <Icons path={mdiInformationOutline} variant="filled" colorScheme="primary" />
                <Icons path={mdiInformationOutline} variant="filled" colorScheme="blue" />
                <Icons path={mdiInformationOutline} variant="filled" colorScheme="pink" />
            </div>
        </div>
    )
}