"use client";

import { useState } from "react";
import { Collaboration, User } from "@/components/bloks/collaboration";

const initialAvailableUsers: User[] = [
  {
    id: "1",
    name: "Arshad Hannan",
    avatarUrl: "/ArshadHannan.svg",
    email: "arshad.hannan@example.com",
  },
  {
    id: "2",
    name: "Christian Hahn",
    avatarUrl: "/ChristianHahn.png",
    email: "christian.hahn@example.com",
  },
  {
    id: "3",
    name: "Frank Grinaert",
    avatarUrl: "/FrankGrinaert.png",
    email: "frank.grinaert@example.com",
  },
  {
    id: "4",
    name: "Lasith Gunaratne",
    avatarUrl: "/LasithGunaratne.png",
    email: "lasith.gunaratne@example.com",
  },
  {
    id: "5",
    name: "Spyridon Misichronis",
    avatarUrl: "/SpyridonMisichronis.png",
    email: "spyridon.misichronis@example.com",
  },
];

export function CollaborationExample() {
  const currentUser: User = {
    id: "1",
    name: "Arshad Hannan",
    avatarUrl: "/ArshadHannan.svg",
    email: "arshad.hannan@example.com",
  };

  const [addedUsers, setAddedUsers] = useState<User[]>([]);

  const handleAddUser = (user: User) => {
    setAddedUsers((prev) => [...prev, user]);
  };

  const handleRemoveUser = (userId: string) => {
    setAddedUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  return (
    <div className="flex items-center justify-center p-8 min-h-[400px]">
      <Collaboration
        users={addedUsers}
        currentUser={currentUser}
        availableUsers={initialAvailableUsers}
        onAddUser={handleAddUser}
        onRemoveUser={handleRemoveUser}
        allowRemoveCurrentUser={true}
        maxDisplayAvatars={3}
        className="w-full max-w-xs"
      />
    </div>
  );
}

