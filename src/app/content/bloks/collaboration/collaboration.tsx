"use client"; // Please remove this you are not using nextjs

import {
  collaborationDemoAvailableUsers,
  collaborationDemoCurrentUser,
  collaborationDemoInitialUsers,
} from "@/app/content/bloks/collaboration/collaboration.mock-data";
import { Collaboration, type User } from "@/components/bloks/collaboration";
import { useCallback, useState } from "react";

export default function CollaborationDemo() {
  const [addedUsers, setAddedUsers] = useState<User[]>(
    collaborationDemoInitialUsers,
  );

  const handleAddUser = useCallback((user: User) => {
    setAddedUsers((prev) => [...prev, user]);
  }, []);

  const handleRemoveUser = useCallback((userId: string) => {
    setAddedUsers((prev) => prev.filter((u) => u.id !== userId));
  }, []);

  return (
    <div className="flex items-start justify-center pt-5 pb-8 px-8 min-h-[400px]">
      <Collaboration
        users={addedUsers}
        currentUser={collaborationDemoCurrentUser}
        availableUsers={collaborationDemoAvailableUsers}
        onAddUser={handleAddUser}
        onRemoveUser={handleRemoveUser}
        allowRemoveCurrentUser={false}
        maxDisplayAvatars={3}
      />
    </div>
  );
}
