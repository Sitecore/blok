export const collaboration = {
  name: "collaboration",
  preview: {
    defaultComponent: "collaboration",
  },
  usage: {
    usage: [
      `import { Collaboration, User } from "@/components/bloks/collaboration";`,
      `// Basic usage with nested popovers
// Click avatar to open Users card
// Click "Add users" to open Add Users card popover
<Collaboration
  users={addedUsers}
  currentUser={currentUser}
  availableUsers={availableUsers}
  onAddUser={(user) => handleAddUser(user)}
  onRemoveUser={(userId) => handleRemoveUser(userId)}
  maxDisplayAvatars={3}
/>`,
      `// With API-based search
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
  },
};
