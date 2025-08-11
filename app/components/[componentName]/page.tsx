import registry from "@/registry.json";
import { notFound } from "next/navigation";

type Props = {
    params: {
        componentName: string;
    };
};

export function generateStaticParams() {
    return registry.items
        .filter((item) => item.type === "registry:ui")
        .map((item) => ({
            componentName: item.name,
        }));
}

export default async function ComponentPage(props: Props) {
    const params = await props.params;

    const component = registry.items.find(
        (item) =>
            item.type === "registry:ui" && item.name === params.componentName
    );

    if (!component) return notFound();

    return (
        <div>
            <h1>{component.name} (Component)</h1>
            <p>Type: {component.type}</p>
            <ul>
                {component.files.map((file) => (
                    <li key={file.path}>{file.path}</li>
                ))}
            </ul>
        </div>
    );
}
