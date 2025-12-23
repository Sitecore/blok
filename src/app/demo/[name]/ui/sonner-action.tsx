'use client'

import { Button } from "@/components/ui/button";
import { Icon } from "@/lib/icon";
import { mdiInformation } from "@mdi/js";
import { toast } from "sonner";

export function ActionSonner() {
    return (
        <Button
            variant="link"
            onClick={() =>
                toast("Toast with an Action", {
                    description: (
                        <span>
                            A description with some more information.{' '}
                            <a href="#" className="text-primary">link</a>
                        </span>
                    ),
                    icon: <Icon path={mdiInformation} className="size-5 text-info" />,
                    action: {
                        label: "Action",
                        onClick: () => console.log("Action!"),
                    },
                })
            }
        >
            Action Toast
        </Button>
    );
}