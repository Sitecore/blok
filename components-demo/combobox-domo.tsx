import { FrameworkCombobox } from "@/components/ui/combobox";
import { UserCombobox } from "@/components/ui/combobox";
import { TimezoneCombobox } from "@/components/ui/combobox";
import { ComboboxWithCheckbox } from "@/components/ui/combobox";

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
  }
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


export function ComboboxDemo() {

  return (
    <div>
      <h2 className="font-semibold text-4xl wrap-break-words">Combobox</h2>
      
    <div className="flex w-full max-w-xl gap-4">

      {/* Framework Combobox */}
      <div id="combobox-framework">
        <div className="p-1">
          <FrameworkCombobox frameworks={[...frameworks]} />
        </div>
      </div>

      {/* User Combobox */}
      <div id="combobox-user">
        <div className="p-1">
          <UserCombobox users={[...users]} selectedUserId={users[0].id} />
        </div>
      </div>

      {/* Timezone Combobox */}
      <div id="combobox-timezone">
        <div className="p-1">
          <TimezoneCombobox
          timezones={[...timezones]}
          selectedTimezone={timezones[0].timezones[0]}
          />
        </div>
      </div>

      {/* Combobox With Checkbox */}
      <div id="combobox-checkbox">
        <div className="p-1">
          <ComboboxWithCheckbox frameworks={[...frameworks]} />
        </div>
      </div>
    
    </div>
    </div>

  );
}