import {
  ComboboxWithCheckbox,
  FrameworkCombobox,
  TimezoneCombobox,
  UserCombobox,
} from "@/components/ui/combobox";
import { Label } from "@/components/ui/label";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];
const users = [
  {
    id: "1",
    username: "shadcn",
  },
  {
    id: "2",
    username: "leerob",
  },
  {
    id: "3",
    username: "evilrabbit",
  },
] as const;
const timezones = [
  {
    label: "Americas",
    timezones: [
      { value: "America/New_York", label: "(GMT-5) New York" },
      { value: "America/Los_Angeles", label: "(GMT-8) Los Angeles" },
      { value: "America/Chicago", label: "(GMT-6) Chicago" },
      { value: "America/Toronto", label: "(GMT-5) Toronto" },
      { value: "America/Vancouver", label: "(GMT-8) Vancouver" },
      { value: "America/Sao_Paulo", label: "(GMT-3) São Paulo" },
    ],
  },
  {
    label: "Europe",
    timezones: [
      { value: "Europe/London", label: "(GMT+0) London" },
      { value: "Europe/Paris", label: "(GMT+1) Paris" },
      { value: "Europe/Berlin", label: "(GMT+1) Berlin" },
      { value: "Europe/Rome", label: "(GMT+1) Rome" },
      { value: "Europe/Madrid", label: "(GMT+1) Madrid" },
      { value: "Europe/Amsterdam", label: "(GMT+1) Amsterdam" },
    ],
  },
  {
    label: "Asia/Pacific",
    timezones: [
      { value: "Asia/Tokyo", label: "(GMT+9) Tokyo" },
      { value: "Asia/Shanghai", label: "(GMT+8) Shanghai" },
      { value: "Asia/Singapore", label: "(GMT+8) Singapore" },
      { value: "Asia/Dubai", label: "(GMT+4) Dubai" },
      { value: "Australia/Sydney", label: "(GMT+11) Sydney" },
      { value: "Asia/Seoul", label: "(GMT+9) Seoul" },
    ],
  },
] as const;

export const combobox = {
  name: "combobox",
  components: {
    FrameworkCombobox: (
      <div className="space-y-2 p-1">
        <Label htmlFor="framework-combobox" id="framework-label">Select Framework</Label>
        <div aria-labelledby="framework-label">
          <FrameworkCombobox frameworks={[...frameworks]} />
        </div>
      </div>
    ),
    UserCombobox: (
      <div className="space-y-2 p-1">
        <Label htmlFor="user-combobox" id="user-label">Select User</Label>
        <div aria-labelledby="user-label">
          <UserCombobox users={[...users]} selectedUserId={users[0].id} />
        </div>
      </div>
    ),
    TimezoneCombobox: (
      <div className="space-y-2 p-1">
        <Label htmlFor="timezone-combobox" id="timezone-label">Select Timezone</Label>
        <div aria-labelledby="timezone-label">
          <TimezoneCombobox
            timezones={[...timezones]}
            selectedTimezone={timezones[0].timezones[0]}
          />
        </div>
      </div>
    ),
    ComboboxWithCheckbox: (
      <div className="space-y-2 p-1">
        <Label htmlFor="frameworks-combobox" id="frameworks-label">Select Frameworks (Multi-select)</Label>
        <div aria-labelledby="frameworks-label">
          <ComboboxWithCheckbox frameworks={[...frameworks]} />
        </div>
      </div>
    ),
  },
};
