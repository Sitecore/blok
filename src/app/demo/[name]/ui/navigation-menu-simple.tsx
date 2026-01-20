import { NavigationMenu, NavigationMenuContent, NavigationMenuTrigger, NavigationMenuItem, NavigationMenuList, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

const components: { title: string; href: string; description: string }[] = [
    {
      title: "Alert Dialog",
      href: "/docs/primitives/alert-dialog",
      description:
        "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
      title: "Hover Card",
      href: "/docs/primitives/hover-card",
      description:
        "For sighted users to preview content available behind a link.",
    },
    {
      title: "Progress",
      href: "/docs/primitives/progress",
      description:
        "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
      title: "Scroll-area",
      href: "/docs/primitives/scroll-area",
      description: "Visually or semantically separates content.",
    },
    {
      title: "Tabs",
      href: "/docs/primitives/tabs",
      description:
        "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
      title: "Tooltip",
      href: "/docs/primitives/tooltip",
      description:
        "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
];

export default function NavigationMenuSimple() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-2 w-full max-w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <ListItem
                                href="#"
                                className="row-span-3 from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                            >
                                <div className="mt-4 mb-2 text-lg font-medium">Blok CN</div>
                                <p className="text-muted-foreground text-sm leading-tight">
                                Beautifully designed components built with Tailwind CSS.
                                </p>
                            </ListItem>
                            <ListItem href="#" title="Build better products faster">
                                Blok is a Sitecore's product design system: the ui framework and style guide we use to build great apps. It's publicly available, so that anyone can easily build software in the Sitecore product design language.
                            </ListItem>
                            <ListItem href="#" title="Installation">
                                How to install dependencies and structure your app.
                            </ListItem>
                            <ListItem href="#" title="Typography">
                                Styles for headings, paragraphs, lists...etc
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {components.map((component) => (
                            <ListItem
                            key={component.title}
                            title={component.title}
                            href="#"
                            >
                            {component.description}
                            </ListItem>
                        ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuLink
                        asChild
                        className={navigationMenuTriggerStyle()}
                    >
                        <Link href="#">Documentation</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

// Framework-agnostic Link component - simple anchor tag for demo purposes
function Link({
    href,
    children,
    className,
    ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
    return (
        <a href={href} className={className} {...props}>
            {children}
        </a>
    );
}

function ListItem({
    title,
    children,
    href,
    ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <Link href={href}>
                    <div className="text-sm leading-none font-medium">{title}</div>
                    <div className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                        {children}
                    </div>
                </Link>
            </NavigationMenuLink>
        </li>
    );
}