import { CollaborationExample } from "@/app/demo/[name]/ui/collaboration-example";

export const collaboration = {
  name: "collaboration",
  defaultComponent: <CollaborationExample />,
  usage: [
    `import { Collaboration } from "@/components/bloks/collaboration";`,
    `// Basic usage
<Collaboration
  users={addedUsers}
  currentUser={currentUser}
  availableUsers={availableUsers}
  onAddUser={(user) => handleAddUser(user)}
  onRemoveUser={(userId) => handleRemoveUser(userId)}
/>`,
    `// API-based search
<Collaboration
  users={addedUsers}
  currentUser={currentUser}
  availableUsers={searchResults}
  onAddUser={(user) => handleAddUser(user)}
  onRemoveUser={(userId) => handleRemoveUser(userId)}
  onSearch={(query) => fetchUsers(query)}
  isSearching={isLoading}
  disableClientFilter={true}
/>`,
  ],
};
