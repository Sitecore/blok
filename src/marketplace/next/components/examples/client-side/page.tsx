'use client'

import { useAppContext } from "@/components/providers/marketplace";


function ClientSideExamples() {
  const appContext = useAppContext()
  return (
    <div>
      <div>Application Context</div>
      <div>{JSON.stringify(appContext)}</div>
    </div>
  );
}

export default ClientSideExamples;
