import { UserCombobox } from "@/components/ui/combobox";

const users = [
  {
    id: "1",
    username: "ChristianHahn",
  },
  {
    id: "2",
    username: "ThomasKelly",
  },
  {
    id: "3",
    username: "FrankGrinaert",
  },
  {
    id: "4",
    username: "SpyridonMisichronis",
  },
  {
    id: "5",
    username: "LasithGunaratne",
  },
] as const;

export default function UserComboboxDemo() {
  return (
    <div className="p-1">
      <UserCombobox users={[...users]} selectedUserId={users[0].id} />
    </div>
  );
}
