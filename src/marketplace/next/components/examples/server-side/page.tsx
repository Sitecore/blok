'use client'

import { ListLanguagesFromApiRoute } from "@/components/examples/server-side/next-api-route/list-languages";
import { ListLanguagesFromServerAction } from "@/components/examples/server-side/next-server-action/list-languages";
import { ListLanguagesFromServerComponent } from "@/components/examples/server-side/server-component/list-languages";
import { useAppContext } from "@/components/providers/marketplace";


function ServerSideExamples() {
  const appContext = useAppContext()
  
  return (
    <div>
      <div>Application Context</div>
      <div>{JSON.stringify(appContext)}</div>
      <br />
      <div>Different ways to call XMC APIs from the server</div>
      <ListLanguagesFromApiRoute />
      <ListLanguagesFromServerAction />
      <ListLanguagesFromServerComponent appContext={appContext} />
    </div>
  );
}

export default ServerSideExamples;
