import { useAppContext } from "@/components/providers/marketplace";
import { ListLanguagesFromClientSdk } from "@/components/examples/with-xmc/list-languages";

function ClientSideExamples() {
  const appContext = useAppContext()
  return (
    <div>
      <div>Application Context</div>
      <div>{JSON.stringify(appContext)}</div>
      <br />
      <div>Different ways to call XMC APIs from the browser</div>
      <ListLanguagesFromClientSdk />
    </div>
  );
}

export default ClientSideExamples;
