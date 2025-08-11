import registry from "@/registry.json";
import { notFound } from "next/navigation";

type Props = {
    params: {
        blockName: string;
    };
};

export function generateStaticParams() {
    return registry.items
        .filter((item) => item.type === "registry:block")
        .map((item) => ({
            blockName: item.name,
        }));
}

export default async function BlockPage(props: Props) {
    const params = await props.params; 

    const block = registry.items.find(
        (item) =>
            item.type === "registry:block" && item.name === params.blockName
    );

    if (!block) return notFound();

    return (
        <div>
            <h1>{block.name} (Block)</h1>
            <p>Type: {block.type}</p>
            <ul>
                {block.files.map((file) => (
                    <li key={file.path}>{file.path}</li>
                ))}
            </ul>
        </div>
    );
}
