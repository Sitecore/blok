import { Icon } from "@/components/ui/icon";
import { mdiInformation, mdiInformationOutline } from "@mdi/js";

export default function TestPage() {
    return (
        <div className="w-screen min-h-screen p-10 flex flex-col items-center gap-4">
            <div className="w-1/2 p-12 rounded-lg bg-subtle-bg flex items-center justify-center gap-4">
                <Icon path={mdiInformationOutline} variant="default" />
                <Icon path={mdiInformationOutline} variant="filled" />
            </div>
            <div className="w-1/2 p-12 rounded-lg bg-subtle-bg flex items-center justify-center gap-4">
                <Icon path={mdiInformationOutline} size="sm" />
                <Icon path={mdiInformationOutline} size="md" />
                <Icon path={mdiInformationOutline} size="default" />
                <Icon path={mdiInformationOutline} size="lg" />
            </div>
            <div className="w-1/2 p-12 rounded-lg bg-subtle-bg flex items-center justify-center gap-4">
                <Icon path={mdiInformationOutline} colorScheme="neutral" />
                <Icon path={mdiInformationOutline} colorScheme="danger" />
                <Icon path={mdiInformationOutline} colorScheme="warning" />
                <Icon path={mdiInformationOutline} colorScheme="yellow" />
                <Icon path={mdiInformationOutline} colorScheme="success" />
                <Icon path={mdiInformationOutline} colorScheme="teal" />
                <Icon path={mdiInformationOutline} colorScheme="cyan" />
                <Icon path={mdiInformationOutline} colorScheme="primary" />
                <Icon path={mdiInformationOutline} colorScheme="blue" />
                <Icon path={mdiInformationOutline} colorScheme="pink" />
            </div>
            <div className="w-1/2 p-12 rounded-lg bg-subtle-bg flex items-center justify-center gap-4">
                <Icon path={mdiInformationOutline} variant="filled" colorScheme="neutral" />
                <Icon path={mdiInformationOutline} variant="filled" colorScheme="danger" />
                <Icon path={mdiInformationOutline} variant="filled" colorScheme="warning" />
                <Icon path={mdiInformationOutline} variant="filled" colorScheme="yellow" />
                <Icon path={mdiInformationOutline} variant="filled" colorScheme="success" />
                <Icon path={mdiInformationOutline} variant="filled" colorScheme="teal" />
                <Icon path={mdiInformationOutline} variant="filled" colorScheme="cyan" />
                <Icon path={mdiInformationOutline} variant="filled" colorScheme="primary" />
                <Icon path={mdiInformationOutline} variant="filled" colorScheme="blue" />
                <Icon path={mdiInformationOutline} variant="filled" colorScheme="pink" />
            </div>
        </div>
    )
}