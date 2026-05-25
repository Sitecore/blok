import type { User } from "@/components/bloks/collaboration";

export const collaborationDemoCurrentUser: User = {
  id: "current",
  name: "Arshad Hannan",
  avatarUrl: "/ArshadHannan.svg",
  email: "arshad.hannan@sitecore.com",
};

export const collaborationDemoAvailableUsers: User[] = [
  {
    id: "2",
    name: "Lasith Gunaratne",
    avatarUrl: "/LasithGunaratne.png",
    email: "lasith.gunaratne@sitecore.com",
  },
  {
    id: "3",
    name: "Spyridon Misichronis",
    avatarUrl: "/SpyridonMisichronis.png",
    email: "spyros.misichronis@sitecore.com",
  },
  {
    id: "4",
    name: "Christian Hahn",
    avatarUrl: "/ChristianHahn.png",
    email: "christian.hahn@sitecore.com",
  },
];

/** Initial users shown in the collaboration demo (overflow avatars). */
export const collaborationDemoInitialUsers: User[] = [
  collaborationDemoCurrentUser,
  collaborationDemoAvailableUsers[0],
  collaborationDemoAvailableUsers[1],
  collaborationDemoAvailableUsers[2],
];
