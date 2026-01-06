import { Icon } from "@/components/ui/icon";
import { mdiInformationOutline } from "@mdi/js";

export function IconDemo() {
  return (
    <div className="grid w-full max-w-xl gap-4">
      <h2 className="font-semibold text-4xl wrap-break-words">Icon</h2>
      {/* Icon Variants */}
      <div id="icon-variants">
        <div className="flex items-center justify-center gap-4">
          <Icon path={mdiInformationOutline} variant="default" />
          <Icon path={mdiInformationOutline} variant="subtle" />
          <Icon path={mdiInformationOutline} variant="filled" />
        </div>
      </div>

      {/* Icon Sizes */}
      <div id="icon-sizes">
        <div className="flex items-center justify-center gap-4">
          <Icon path={mdiInformationOutline} size="sm" />
          <Icon path={mdiInformationOutline} size="md" />
          <Icon path={mdiInformationOutline} size="default" />
          <Icon path={mdiInformationOutline} size="lg" />
          <Icon path={mdiInformationOutline} size="xl" />
          <Icon path={mdiInformationOutline} size="xxl" />
        </div>  
      </div>

      {/* Icon Color Schemes */}
      <div id="icon-color-schemes">
        <div className="flex items-center justify-center gap-4">
          <Icon path={mdiInformationOutline} colorScheme="primary" />
          <Icon path={mdiInformationOutline} colorScheme="neutral" />
          <Icon path={mdiInformationOutline} colorScheme="danger" />
          <Icon path={mdiInformationOutline} colorScheme="warning" />
          <Icon path={mdiInformationOutline} colorScheme="yellow" />
          <Icon path={mdiInformationOutline} colorScheme="success" />
          <Icon path={mdiInformationOutline} colorScheme="teal" />
          <Icon path={mdiInformationOutline} colorScheme="cyan" />
          <Icon path={mdiInformationOutline} colorScheme="blue" />
          <Icon path={mdiInformationOutline} colorScheme="purple" />
          <Icon path={mdiInformationOutline} colorScheme="pink" />
        </div>
      </div>

      
      {/* Icon Subtle Variants */}
      <div id="icon-subtle-variants">
        <div className="flex items-center justify-center gap-4">
          <Icon path={mdiInformationOutline} variant="subtle" colorScheme="primary" />
          <Icon path={mdiInformationOutline} variant="subtle" colorScheme="neutral" />
          <Icon path={mdiInformationOutline} variant="subtle" colorScheme="success" />
          <Icon path={mdiInformationOutline} variant="subtle" colorScheme="danger" />
          <Icon path={mdiInformationOutline} variant="subtle" colorScheme="warning" />
          <Icon path={mdiInformationOutline} variant="subtle" colorScheme="yellow" />
          <Icon path={mdiInformationOutline} variant="subtle" colorScheme="teal" />
          <Icon path={mdiInformationOutline} variant="subtle" colorScheme="cyan" />
          <Icon path={mdiInformationOutline} variant="subtle" colorScheme="blue" />
          <Icon path={mdiInformationOutline} variant="subtle" colorScheme="purple" />
          <Icon path={mdiInformationOutline} variant="subtle" colorScheme="pink" />
        </div>
      </div>

     
      {/* Icon Filled Variants */}
      <div id="icon-filled-variants">
        <div className="flex items-center justify-center gap-4">
          <Icon path={mdiInformationOutline} variant="filled" colorScheme="primary" />
          <Icon path={mdiInformationOutline} variant="filled" colorScheme="neutral" />
          <Icon path={mdiInformationOutline} variant="filled" colorScheme="success" />
          <Icon path={mdiInformationOutline} variant="filled" colorScheme="danger" />
          <Icon path={mdiInformationOutline} variant="filled" colorScheme="warning" />
          <Icon path={mdiInformationOutline} variant="filled" colorScheme="yellow" />
          <Icon path={mdiInformationOutline} variant="filled" colorScheme="teal" />
          <Icon path={mdiInformationOutline} variant="filled" colorScheme="cyan" />
          <Icon path={mdiInformationOutline} variant="filled" colorScheme="blue" />
          <Icon path={mdiInformationOutline} variant="filled" colorScheme="purple" />
          <Icon path={mdiInformationOutline} variant="filled" colorScheme="pink" />
        </div>
      </div>
    </div>
  )
}
