export const avatar = {
  name: "avatar",
  preview: {
    defaultComponent: "avatar",
  },
  usage: {
    usage: [
      `import {\n  Avatar,\n  AvatarFallback,\n  AvatarImage,\n} from "@/components/ui/avatar"`,
      `<Avatar>\n  <AvatarImage src="https://ca.slack-edge.com/T1S2RKGUA-U015TJJS8MS-b581732f917e-512" alt="Frank Grinaert" />\n  <AvatarFallback>\n    <span>CN</span>\n  </AvatarFallback>\n</Avatar>`,
    ],
  },
  components: {
    Fallback: { component: "avatar-fallback" },
    Large: { component: "avatar-large" },
    Interactive: { component: "avatar-interactive" },
    Menu: { component: "avatar-menu" },
  },
};
