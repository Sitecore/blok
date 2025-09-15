'use client'

import { ListLanguagesFromApiRoute } from "@/components/examples/server-side/next-api-route/list-languages";
import { ListLanguagesFromServerAction } from "@/components/examples/server-side/next-server-action/list-languages";
import { ListLanguagesFromServerComponent } from "@/components/examples/server-side/server-component/list-languages";
import { ListLanguagesFromClientSdk } from "./client-side/with-xmc/list-languages";
import { useAppContext } from "@/components/providers/marketplace";


function Examples() {
  const appContext = useAppContext()
  
  return (
    <div>
      <div>Application Context</div>
      <div>{JSON.stringify(appContext)}</div>
      <br />
      <div>Different ways to call XMC APIs from the browser</div>
      <ListLanguagesFromClientSdk />
      <br />
      <div>Different ways to call XMC APIs from the server</div>
      <ListLanguagesFromApiRoute />
      <ListLanguagesFromServerAction />
      <ListLanguagesFromServerComponent appContext={appContext} />
    </div>
  );
}

export default Examples;
