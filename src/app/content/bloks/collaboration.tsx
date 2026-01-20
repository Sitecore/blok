"use client";  // Please remove this you are not using nextjs

import { useState } from "react";
import { Collaboration, type User } from "@/components/bloks/collaboration";

const currentUser: User = {
  id: "current",
  name: "Arshad Hannan",
  avatarUrl: "/ArshadHannan.svg",
  email: "arshad.hannan@sitecore.com",
};

const availableUsers: User[] = [
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

export default function CollaborationDemo() {
  // Start with multiple users to show overflow behavior (maxDisplayAvatars=3)
  const [addedUsers, setAddedUsers] = useState<User[]>([
    currentUser,
    availableUsers[0], 
    availableUsers[1], 
    availableUsers[2], 
  ]);

  const handleAddUser = (user: User) => {
    setAddedUsers((prev) => [...prev, user]);
  };

  const handleRemoveUser = (userId: string) => {
    setAddedUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  return (
    <div className="flex items-start justify-center pt-5 pb-8 px-8 min-h-[400px]">
      <Collaboration
        users={addedUsers}
        currentUser={currentUser}
        availableUsers={availableUsers}
        onAddUser={handleAddUser}
        onRemoveUser={handleRemoveUser}
        allowRemoveCurrentUser={false}
        maxDisplayAvatars={3}
      />
    </div>
  );
}
