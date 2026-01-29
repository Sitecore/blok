export const card = {
  name: "card",
  preview: {
    defaultComponent: "card",
  },
  usage: {
    usage: [
      `import {\n  Card,\n  CardContent,\n  CardDescription,\n  CardFooter,\n  CardHeader,\n  CardTitle,\n} from "@/components/ui/card"`,
      `<Card>\n  <CardHeader>\n    <CardTitle>Card Title</CardTitle>\n    <CardDescription>Card Description</CardDescription>\n  </CardHeader>\n  <CardContent>\n    <p>Card Content</p>\n  </CardContent>\n  <CardFooter>\n    <p>Card Footer</p>\n  </CardFooter>\n</Card>`,
    ],
  },
  components: {
    Elevation: { component: "card-elevation" },
    Style: { component: "card-style" },
    Padding: { component: "card-padding" },
    "Styled Card": { component: "card-styled" },
  },
};
