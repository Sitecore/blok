/**
 * Telemetry event names for Gainsight PX.
 */
export const TELEMETRY_EVENTS = {
  // Pages visited
  page_view: "page_view",
  topbar_nav_click: "topbar_nav_click",
  sidebar_nav_click: "sidebar_nav_click",
  topbar_search_result_click: "topbar_search_result_click",
  registry_card_click: "registry_card_click",
  // TopBar – theme & external links
  topbar_theme_toggle: "topbar_theme_toggle",
  topbar_link_click: "topbar_link_click",
  // TopBar – search (on result select, not per-keystroke)
  topbar_search_query: "topbar_search_query",
  // Right sidebar
  right_sidebar_toc_click: "right_sidebar_toc_click",
  right_sidebar_link_click: "right_sidebar_link_click",
  // Copy
  copy_code: "copy_code",
  copy_token: "copy_token",
  copy_icon_code: "copy_icon_code",
  copy_url: "copy_url",
  // Tabs
  demo_tab_switch: "demo_tab_switch",
  installation_tab_switch: "installation_tab_switch",
  // Preview interaction (clicks/focus inside live demo)
  preview_interaction: "preview_interaction",
  // Homepage
  home_get_started_click: "home_get_started_click",
  home_browse_primitives_click: "home_browse_primitives_click",
  home_prerequisite_link_click: "home_prerequisite_link_click",
  home_shadcn_tip_link_click: "home_shadcn_tip_link_click",
} as const;

export type TelemetryEventName =
  (typeof TELEMETRY_EVENTS)[keyof typeof TELEMETRY_EVENTS];
