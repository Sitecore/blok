import {
    mdiCommentOutline,
    mdiInformationOutline,
    mdiLayers,
    mdiViewDashboard,
  } from "@mdi/js";
  
  export const sidebarRhsDemoExampleHeight = "h-[720px]";
  
  /** Demos hide pop-out by default. Set to true to show dock/undock controls again. */
  export const sidebarRhsDemoDockable = false;
  
  export type SidebarRhsDemoNavItem = {
    name: string;
    path: string;
    iconPath: string;
  };
  
  export const sidebarRhsDemoNavItems: SidebarRhsDemoNavItem[] = [
    { name: "Overview", path: "/overview", iconPath: mdiViewDashboard },
    { name: "Usage", path: "/usage", iconPath: mdiLayers },
    { name: "Comments", path: "/comments", iconPath: mdiCommentOutline },
    { name: "Info", path: "/info", iconPath: mdiInformationOutline },
  ];
  
  export type SidebarRhsDemoBriefItem = {
    name: string;
    status: string;
    statusColor: "neutral" | "success";
  };
  
  export const sidebarRhsDemoBriefItems: SidebarRhsDemoBriefItem[] = [
    { name: "Campaign Brief Q1", status: "Draft", statusColor: "neutral" },
    { name: "Product Launch Brief", status: "Published", statusColor: "success" },
    { name: "Homepage Refresh Brief", status: "Draft", statusColor: "neutral" },
    { name: "Holiday Campaign Brief", status: "Draft", statusColor: "neutral" },
    { name: "Partner Portal Brief", status: "Draft", statusColor: "neutral" },
    { name: "Brand Guidelines Brief", status: "Draft", statusColor: "neutral" },
    { name: "Email Nurture Brief", status: "Draft", statusColor: "neutral" },
    { name: "App Onboarding Brief", status: "Draft", statusColor: "neutral" },
    { name: "Regional Launch Brief", status: "Draft", statusColor: "neutral" },
    { name: "Content Hub Brief", status: "Draft", statusColor: "neutral" },
    { name: "Analytics Rollout Brief", status: "Draft", statusColor: "neutral" },
    { name: "Support Portal Brief", status: "Draft", statusColor: "neutral" },
  ];
  
  export const sidebarRhsDemoUsageIntro = "Briefs that are using this brief type";
  
  export type SidebarRhsDemoInfoField = {
    label: string;
    value: string;
    copyable?: boolean;
  };
  
  export const sidebarRhsDemoInfoFields: SidebarRhsDemoInfoField[] = [
    { label: "Label", value: "The label", copyable: true },
    { label: "Name", value: "Value", copyable: true },
    { label: "Created by", value: "Value" },
    { label: "Created", value: "Person, Date" },
    { label: "Updated", value: "Person, Date" },
  ];
  