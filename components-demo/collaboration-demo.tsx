"use client";

import {
  collaborationDemoAvailableUsers,
  collaborationDemoCurrentUser,
  collaborationDemoInitialUsers,
} from "@/app/content/bloks/collaboration/collaboration.mock-data";
import { Collaboration, type User } from "@/components/bloks/collaboration";
import { useCallback, useState } from "react";

export function CollaborationDemo() {

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

    <div className="grid gap-4">
    <h2 className="font-semibold text-4xl wrap-break-words">Collaboration</h2>

      <div id="collaboration">
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
      </div>

    </div>

  );
}
