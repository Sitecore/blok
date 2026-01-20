import { 
    Editable, 
    EditablePreview, 
    EditableTextarea 
} from "@/components/ui/editable";

export default function EditableTextareaDemo() {
    return (
        <div className="w-96">
            <Editable
                defaultValue="This is a longer piece of text that spans multiple lines. Click to edit it and add more content."
                placeholder="Enter a description..."
            >
                <EditablePreview className="w-96" />
                <EditableTextarea className="w-96" />
            </Editable>
        </div>
    )
}