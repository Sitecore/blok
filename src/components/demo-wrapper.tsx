import DemoPage from "@/app/demo/[name]/page";

export default async function DemoWrapper({ name }: { name: string }) {
  return <DemoPage params={Promise.resolve({ name })} />;
}
