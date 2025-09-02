import { type Registry } from "shadcn/registry"

export const blocks: Registry["items"] = [
  {
    name: "dashboard-01",
    type: "registry:block",
    description: "A dashboard with sidebar, charts and data table.",
    dependencies: [
      "@dnd-kit/core",
      "@dnd-kit/modifiers",
      "@dnd-kit/sortable",
      "@dnd-kit/utilities",
      "@tanstack/react-table",
      "zod",
    ],
    registryDependencies: [
      "sidebar",
      "breadcrumb",
      "separator",
      "label",
      "chart",
      "card",
      "select",
      "tabs",
      "table",
      "toggle-group",
      "badge",
      "button",
      "checkbox",
      "dropdown-menu",
      "drawer",
      "input",
      "avatar",
      "sheet",
      "sonner",
    ],
    files: [
      {
        path: "blocks/dashboard-01/page.tsx",
        type: "registry:page",
        target: "app/dashboard/page.tsx",
      },
      {
        path: "blocks/dashboard-01/data.json",
        type: "registry:file",
        target: "app/dashboard/data.json",
      },
      {
        path: "blocks/dashboard-01/components/app-sidebar.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/dashboard-01/components/chart-area-interactive.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/dashboard-01/components/data-table.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/dashboard-01/components/nav-documents.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/dashboard-01/components/nav-main.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/dashboard-01/components/nav-secondary.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/dashboard-01/components/nav-user.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/dashboard-01/components/section-cards.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/dashboard-01/components/site-header.tsx",
        type: "registry:component",
      },
    ],
    categories: ["dashboard"],
  },
  {
    name: "sidebar-01",
    type: "registry:block",
    description: "A simple sidebar with navigation grouped by section.",
    registryDependencies: [
      "sidebar",
      "breadcrumb",
      "separator",
      "label",
      "dropdown-menu",
    ],
    files: [
      {
        path: "blocks/sidebar-01/page.tsx",
        type: "registry:page",
        target: "app/dashboard/page.tsx",
      },
      {
        path: "blocks/sidebar-01/components/app-sidebar.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-01/components/search-form.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-01/components/version-switcher.tsx",
        type: "registry:component",
      },
    ],
    categories: ["sidebar", "dashboard"],
  },
  {
    name: "sidebar-02",
    description: "A sidebar with collapsible sections.",
    type: "registry:block",
    registryDependencies: [
      "sidebar",
      "breadcrumb",
      "separator",
      "label",
      "dropdown-menu",
    ],
    files: [
      {
        path: "blocks/sidebar-02/page.tsx",
        type: "registry:page",
        target: "app/dashboard/page.tsx",
      },
      {
        path: "blocks/sidebar-02/components/app-sidebar.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-02/components/search-form.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-02/components/version-switcher.tsx",
        type: "registry:component",
      },
    ],
    categories: ["sidebar", "dashboard"],
  },
  {
    name: "sidebar-03",
    description: "A sidebar with submenus.",
    type: "registry:block",
    registryDependencies: ["sidebar", "breadcrumb"],
    files: [
      {
        path: "blocks/sidebar-03/page.tsx",
        type: "registry:page",
        target: "app/dashboard/page.tsx",
      },
      {
        path: "blocks/sidebar-03/components/app-sidebar.tsx",
        type: "registry:component",
      },
    ],
    categories: ["sidebar", "dashboard"],
  },
  {
    name: "sidebar-04",
    description: "A floating sidebar with submenus.",
    type: "registry:block",
    registryDependencies: ["sidebar", "breadcrumb", "separator"],
    files: [
      {
        path: "blocks/sidebar-04/page.tsx",
        type: "registry:page",
        target: "app/dashboard/page.tsx",
      },
      {
        path: "blocks/sidebar-04/components/app-sidebar.tsx",
        type: "registry:component",
      },
    ],
    categories: ["sidebar", "dashboard"],
  },
  {
    name: "sidebar-05",
    description: "A sidebar with collapsible submenus.",
    type: "registry:block",
    registryDependencies: [
      "sidebar",
      "breadcrumb",
      "separator",
      "label",
      "collapsible",
    ],
    files: [
      {
        path: "blocks/sidebar-05/page.tsx",
        type: "registry:page",
        target: "app/dashboard/page.tsx",
      },
      {
        path: "blocks/sidebar-05/components/app-sidebar.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-05/components/search-form.tsx",
        type: "registry:component",
      },
    ],
    categories: ["sidebar", "dashboard"],
  },
  {
    name: "sidebar-06",
    description: "A sidebar with submenus as dropdowns.",
    type: "registry:block",
    registryDependencies: [
      "sidebar",
      "breadcrumb",
      "separator",
      "card",
      "dropdown-menu",
    ],
    files: [
      {
        path: "blocks/sidebar-06/page.tsx",
        type: "registry:page",
        target: "app/dashboard/page.tsx",
      },
      {
        path: "blocks/sidebar-06/components/app-sidebar.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-06/components/nav-main.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-06/components/sidebar-opt-in-form.tsx",
        type: "registry:component",
      },
    ],
    categories: ["sidebar", "dashboard"],
  },
  {
    name: "sidebar-07",
    type: "registry:block",
    description: "A sidebar that collapses to icons.",
    registryDependencies: [
      "sidebar",
      "breadcrumb",
      "separator",
      "collapsible",
      "dropdown-menu",
      "avatar",
    ],
    files: [
      {
        path: "blocks/sidebar-07/page.tsx",
        type: "registry:page",
        target: "app/dashboard/page.tsx",
      },
      {
        path: "blocks/sidebar-07/components/app-sidebar.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-07/components/nav-main.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-07/components/nav-projects.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-07/components/nav-user.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-07/components/team-switcher.tsx",
        type: "registry:component",
      },
    ],
    categories: ["sidebar", "dashboard"],
  },
  {
    name: "sidebar-08",
    description: "An inset sidebar with secondary navigation.",
    type: "registry:block",
    registryDependencies: [
      "sidebar",
      "breadcrumb",
      "separator",
      "collapsible",
      "dropdown-menu",
      "avatar",
    ],
    files: [
      {
        path: "blocks/sidebar-08/page.tsx",
        type: "registry:page",
        target: "app/dashboard/page.tsx",
      },
      {
        path: "blocks/sidebar-08/components/app-sidebar.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-08/components/nav-main.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-08/components/nav-projects.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-08/components/nav-secondary.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-08/components/nav-user.tsx",
        type: "registry:component",
      },
    ],
    categories: ["sidebar", "dashboard"],
  },
  {
    name: "sidebar-09",
    description: "Collapsible nested sidebars.",
    type: "registry:block",
    registryDependencies: [
      "sidebar",
      "breadcrumb",
      "separator",
      "collapsible",
      "dropdown-menu",
      "avatar",
      "switch",
      "label",
    ],
    files: [
      {
        path: "blocks/sidebar-09/page.tsx",
        type: "registry:page",
        target: "app/dashboard/page.tsx",
      },
      {
        path: "blocks/sidebar-09/components/app-sidebar.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-09/components/nav-user.tsx",
        type: "registry:component",
      },
    ],
    categories: ["sidebar", "dashboard"],
  },
  {
    name: "sidebar-10",
    description: "A sidebar in a popover.",
    type: "registry:block",
    registryDependencies: [
      "sidebar",
      "breadcrumb",
      "separator",
      "popover",
      "collapsible",
      "dropdown-menu",
    ],
    files: [
      {
        path: "blocks/sidebar-10/page.tsx",
        type: "registry:page",
        target: "app/dashboard/page.tsx",
      },
      {
        path: "blocks/sidebar-10/components/app-sidebar.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-10/components/nav-actions.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-10/components/nav-favorites.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-10/components/nav-main.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-10/components/nav-secondary.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-10/components/nav-workspaces.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-10/components/team-switcher.tsx",
        type: "registry:component",
      },
    ],
    categories: ["sidebar", "dashboard"],
  },
  {
    name: "sidebar-11",
    description: "A sidebar with a collapsible file tree.",
    type: "registry:block",
    registryDependencies: ["sidebar", "breadcrumb", "separator", "collapsible"],
    files: [
      {
        path: "blocks/sidebar-11/page.tsx",
        type: "registry:page",
        target: "app/dashboard/page.tsx",
      },
      {
        path: "blocks/sidebar-11/components/app-sidebar.tsx",
        type: "registry:component",
      },
    ],
    categories: ["sidebar", "dashboard"],
  },
  {
    name: "sidebar-12",
    description: "A sidebar with a calendar.",
    type: "registry:block",
    registryDependencies: [
      "sidebar",
      "breadcrumb",
      "separator",
      "collapsible",
      "calendar",
      "dropdown-menu",
      "avatar",
    ],
    files: [
      {
        path: "blocks/sidebar-12/page.tsx",
        type: "registry:page",
        target: "app/dashboard/page.tsx",
      },
      {
        path: "blocks/sidebar-12/components/app-sidebar.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-12/components/calendars.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-12/components/date-picker.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-12/components/nav-user.tsx",
        type: "registry:component",
      },
    ],
    categories: ["sidebar", "dashboard"],
  },
  {
    name: "sidebar-13",
    description: "A sidebar in a dialog.",
    type: "registry:block",
    registryDependencies: ["sidebar", "breadcrumb", "button", "dialog"],
    files: [
      {
        path: "blocks/sidebar-13/page.tsx",
        type: "registry:page",
        target: "app/dashboard/page.tsx",
      },
      {
        path: "blocks/sidebar-13/components/settings-dialog.tsx",
        type: "registry:component",
      },
    ],
    categories: ["sidebar", "dashboard"],
  },
  {
    name: "sidebar-14",
    description: "A sidebar on the right.",
    type: "registry:block",
    registryDependencies: ["sidebar", "breadcrumb"],
    files: [
      {
        path: "blocks/sidebar-14/page.tsx",
        type: "registry:page",
        target: "app/dashboard/page.tsx",
      },
      {
        path: "blocks/sidebar-14/components/app-sidebar.tsx",
        type: "registry:component",
      },
    ],
    categories: ["sidebar", "dashboard"],
  },
  {
    name: "sidebar-15",
    description: "A left and right sidebar.",
    type: "registry:block",
    registryDependencies: [
      "sidebar",
      "breadcrumb",
      "separator",
      "popover",
      "collapsible",
      "dropdown-menu",
      "calendar",
      "avatar",
    ],
    files: [
      {
        path: "blocks/sidebar-15/page.tsx",
        type: "registry:page",
        target: "app/dashboard/page.tsx",
      },
      {
        path: "blocks/sidebar-15/components/calendars.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-15/components/date-picker.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-15/components/nav-favorites.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-15/components/nav-main.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-15/components/nav-secondary.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-15/components/nav-user.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-15/components/nav-workspaces.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-15/components/sidebar-left.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-15/components/sidebar-right.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-15/components/team-switcher.tsx",
        type: "registry:component",
      },
    ],
    categories: ["sidebar", "dashboard"],
  },
  {
    name: "sidebar-16",
    description: "A sidebar with a sticky site header.",
    type: "registry:block",
    registryDependencies: [
      "sidebar",
      "breadcrumb",
      "separator",
      "collapsible",
      "dropdown-menu",
      "avatar",
      "button",
      "label",
    ],
    files: [
      {
        path: "blocks/sidebar-16/page.tsx",
        type: "registry:page",
        target: "app/dashboard/page.tsx",
      },
      {
        path: "blocks/sidebar-16/components/app-sidebar.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-16/components/nav-main.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-16/components/nav-projects.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-16/components/nav-secondary.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-16/components/nav-user.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-16/components/search-form.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-16/components/site-header.tsx",
        type: "registry:component",
      },
    ],
    categories: ["sidebar", "dashboard"],
  },
  {
    name: "login-01",
    description: "A simple login form.",
    type: "registry:block",
    registryDependencies: ["button", "card", "input", "label"],
    files: [
      {
        path: "blocks/login-01/page.tsx",
        target: "app/login/page.tsx",
        type: "registry:page",
      },
      {
        path: "blocks/login-01/components/login-form.tsx",
        type: "registry:component",
      },
    ],
    categories: ["authentication", "login"],
  },
  {
    name: "login-02",
    description: "A two column login page with a cover image.",
    type: "registry:block",
    registryDependencies: ["button", "card", "input", "label"],
    files: [
      {
        path: "blocks/login-02/page.tsx",
        target: "app/login/page.tsx",
        type: "registry:page",
      },
      {
        path: "blocks/login-02/components/login-form.tsx",
        type: "registry:component",
      },
    ],
    categories: ["authentication", "login"],
  },
  {
    name: "login-03",
    description: "A login page with a muted background color.",
    type: "registry:block",
    registryDependencies: ["button", "card", "input", "label"],
    files: [
      {
        path: "blocks/login-03/page.tsx",
        target: "app/login/page.tsx",
        type: "registry:page",
      },
      {
        path: "blocks/login-03/components/login-form.tsx",
        type: "registry:component",
      },
    ],
    categories: ["authentication", "login"],
  },
  {
    name: "login-04",
    description: "A login page with form and image.",
    type: "registry:block",
    registryDependencies: ["button", "card", "input", "label"],
    files: [
      {
        path: "blocks/login-04/page.tsx",
        target: "app/login/page.tsx",
        type: "registry:page",
      },
      {
        path: "blocks/login-04/components/login-form.tsx",
        type: "registry:component",
      },
    ],
    categories: ["authentication", "login"],
  },
  {
    name: "login-05",
    description: "A simple email-only login page.",
    type: "registry:block",
    registryDependencies: ["button", "card", "input", "label"],
    files: [
      {
        path: "blocks/login-05/page.tsx",
        target: "app/login/page.tsx",
        type: "registry:page",
      },
      {
        path: "blocks/login-05/components/login-form.tsx",
        type: "registry:component",
      },
    ],
    categories: ["authentication", "login"],
  },
  {
    name: "stream-brandkit-picker",
    type: "registry:block",
    description:
      "Stream team's comprehensive brandkit picker with all brandkit components",
    dependencies: ["@sitecore/stream-ui-core", "@mdi/js"],
    registryDependencies: ["button", "popover", "input", "separator", "avatar"],
    files: [
      {
        path: "stream/blocks/stream-brandkit-picker/components/stream-brandkit-picker.tsx",
        type: "registry:component",
        target:
          "components/stream-components/blocks/stream-brandkit-picker/components/stream-brandkit-picker.tsx",
      },
      {
        path: "stream/blocks/stream-brandkit-picker/components/stream-brandkit-list.tsx",
        type: "registry:component",
        target:
          "components/stream-components/blocks/stream-brandkit-picker/components/stream-brandkit-list.tsx",
      },
      {
        path: "stream/blocks/stream-brandkit-picker/components/stream-brandkit-item.tsx",
        type: "registry:component",
        target:
          "components/stream-components/blocks/stream-brandkit-picker/components/stream-brandkit-item.tsx",
      },
      {
        path: "stream/blocks/stream-brandkit-picker/page.tsx",
        type: "registry:page",
        target: "app/blocks/stream-brandkit-picker/page.tsx",
      },
    ],
    categories: ["stream", "ui", "brandkit", "picker"],
  },
  {
    name: "stream-chat-history",
    type: "registry:block",
    description: "Stream chat history component",
    dependencies: ["@mdi/js"],
    files: [
      {
        path: "stream/blocks/stream-chat-history/chat-history.tsx",
        type: "registry:component",
        target:
          "components/stream-components/blocks/stream-chat-history/chat-history.tsx",
      },
      {
        path: "stream/blocks/stream-chat-history/page.tsx",
        type: "registry:page",
        target: "app/blocks/stream-chat-history/page.tsx",
      },
    ],
    categories: ["stream", "ui", "chat", "history"],
  },
  {
    name: "stream-messages",
    type: "registry:block",
    description: "Stream team's chat messages for rendering in a chat window",
    dependencies: [
      "@sitecore/stream-ui-core",
      "@mdi/js",
      "react-dropzone",
      "jotai",
      "sonner",
      "lodash",
      "react-textarea-autosize",
    ],
    registryDependencies: [
      "button",
      "popover",
      "input",
      "separator",
      "avatar",
      "tooltip",
      "popover",
      "card",
      "select",
      "dialog",
    ],
    files: [
      {
        path: "stream/blocks/chat/stream-messages.tsx",
        type: "registry:component",
        target: "components/stream-components/blocks/chat/stream-messages.tsx",
      },
      {
        path: "stream/blocks/chat/Anchors.tsx",
        type: "registry:component",
        target: "components/stream-components/blocks/chat/Anchors.tsx",
      },
      {
        path: "stream/blocks/chat/Icon.tsx",
        type: "registry:component",
        target: "components/stream-components/blocks/chat/Icon.tsx",
      },
      {
        path: "stream/blocks/chat/LightBox.tsx",
        type: "registry:component",
        target: "components/stream-components/blocks/chat/LightBox.tsx",
      },
      {
        path: "stream/blocks/chat/Messages.tsx",
        type: "registry:component",
        target: "components/stream-components/blocks/chat/Messages.tsx",
      },
      {
        path: "stream/blocks/chat/Markdown.tsx",
        type: "registry:component",
        target: "components/stream-components/blocks/chat/Markdown.tsx",
      },
      {
        path: "stream/blocks/chat/MessageFeedback.tsx",
        type: "registry:component",
        target: "components/stream-components/blocks/chat/MessageFeedback.tsx",
      },
      {
        path: "stream/blocks/chat/MessageSubtitle.tsx",
        type: "registry:component",
        target: "components/stream-components/blocks/chat/MessageSubtitle.tsx",
      },
      {
        path: "stream/blocks/chat/PromptForm.tsx",
        type: "registry:component",
        target: "components/stream-components/blocks/chat/PromptForm.tsx",
      },
      {
        path: "stream/blocks/chat/SourceItem.tsx",
        type: "registry:component",
        target: "components/stream-components/blocks/chat/SourceItem.tsx",
      },
      {
        path: "stream/blocks/chat/Spinner.tsx",
        type: "registry:component",
        target: "components/stream-components/blocks/chat/Spinner.tsx",
      },
      {
        path: "stream/blocks/chat/stream-messages.tsx",
        type: "registry:component",
        target: "components/stream-components/blocks/chat/stream-messages.tsx",
      },
      {
        path: "stream/blocks/chat/ActionModal.tsx",
        type: "registry:component",
        target: "components/stream-components/blocks/chat/ActionModal.tsx",
      },
      {
        path: "stream/blocks/chat/UserMessage.tsx",
        type: "registry:component",
        target: "components/stream-components/blocks/chat/UserMessage.tsx",
      },
      {
        path: "stream/blocks/chat/EditCommands.tsx",
        type: "registry:component",
        target: "components/stream-components/blocks/chat/EditCommands.tsx",
      },
      {
        path: "stream/blocks/chat/GetDocumentProxyUrl.tsx",
        type: "registry:component",
        target:
          "components/stream-components/blocks/chat/GetDocumentProxyUrl.tsx",
      },
      {
        path: "stream/blocks/chat/Feedback.tsx",
        type: "registry:component",
        target: "components/stream-components/blocks/chat/Feedback.tsx",
      },
      {
        path: "stream/blocks/chat/Workflow.tsx",
        type: "registry:component",
        target: "components/stream-components/blocks/chat/Workflow.tsx",
      },
      {
        path: "stream/blocks/chat/ButtonScrollToBottom.tsx",
        type: "registry:component",
        target:
          "components/stream-components/blocks/chat/ButtonScrollToBottom.tsx",
      },
      {
        path: "stream/blocks/chat/types.ts",
        type: "registry:file",
        target: "components/stream-components/blocks/chat/types.ts",
      },
      {
        path: "stream/blocks/chat/hooks/useNewChat.tsx",
        type: "registry:hook",
        target: "components/stream-components/blocks/chat/hooks/useNewChat.tsx",
      },
      {
        path: "stream/blocks/chat/hooks/useAutoScroll.tsx",
        type: "registry:hook",
        target:
          "components/stream-components/blocks/chat/hooks/useAutoScroll.tsx",
      },
      {
        path: "stream/blocks/chat/hooks/useEnterSubmit.tsx",
        type: "registry:hook",
        target:
          "components/stream-components/blocks/chat/hooks/useEnterSubmit.tsx",
      },
      {
        path: "stream/blocks/chat/hooks/useImageDropzone.tsx",
        type: "registry:hook",
        target:
          "components/stream-components/blocks/chat/hooks/useImageDropzone.tsx",
      },
      {
        path: "stream/blocks/chat/hooks/useLocalStorage.ts",
        type: "registry:hook",
        target:
          "components/stream-components/blocks/chat/hooks/useLocalStorage.tsx",
      },
      {
        path: "stream/blocks/chat/hooks/useScrollAnchor.tsx",
        type: "registry:hook",
        target:
          "components/stream-components/blocks/chat/hooks/useScrollAnchor.tsx",
      },
      {
        path: "stream/blocks/chat/hooks/useAiChatProvider.tsx",
        type: "registry:hook",
        target:
          "components/stream-components/blocks/chat/hooks/useAiChatProvider.tsx",
      },
      {
        path: "stream/blocks/chat/icons/RectangleStar.tsx",
        type: "registry:component",
        target:
          "components/stream-components/blocks/chat/icons/RectangleStar.tsx",
      },
      {
        path: "stream/blocks/chat/store/atoms.ts",
        type: "registry:component",
        target: "components/stream-components/blocks/chat/store/atoms.ts",
      },
      {
        path: "stream/blocks/chat/store/types.ts",
        type: "registry:component",
        target: "components/stream-components/blocks/chat/store/types.ts",
      },
      {
        path: "stream/blocks/chat/tools/Tool.tsx",
        type: "registry:component",
        target: "components/stream-components/blocks/chat/tools/Tool.tsx",
      },
      {
        path: "stream/blocks/chat/tools/Answer.tsx",
        type: "registry:component",
        target: "components/stream-components/blocks/chat/tools/Answer.tsx",
      },
      {
        path: "stream/blocks/chat/tools/Sources.tsx",
        type: "registry:component",
        target: "components/stream-components/blocks/chat/tools/Sources.tsx",
      },
      {
        path: "stream/blocks/chat/tools/ThinkingTool.tsx",
        type: "registry:component",
        target:
          "components/stream-components/blocks/chat/tools/ThinkingTool.tsx",
      },
      {
        path: "stream/blocks/chat/tools/ToolInvocations.tsx",
        type: "registry:component",
        target:
          "components/stream-components/blocks/chat/tools/ToolInvocations.tsx",
      },
      {
        path: "stream/blocks/chat/tools/FollowupQuestions.tsx",
        type: "registry:component",
        target:
          "components/stream-components/blocks/chat/tools/FollowupQuestions.tsx",
      },
      {
        path: "stream/blocks/chat/tools/utils/createTool.tsx",
        type: "registry:component",
        target:
          "components/stream-components/blocks/chat/tools/utils/createTool.tsx",
      },
      {
        path: "stream/blocks/chat/tools/brief/Brief.tsx",
        type: "registry:component",
        target:
          "components/stream-components/blocks/chat/tools/brief/Brief.tsx",
      },
      {
        path: "stream/blocks/chat/tools/brief/useBriefLogic.tsx",
        type: "registry:hook",
        target:
          "components/stream-components/blocks/chat/tools/brief/useBriefLogic.tsx",
      },
      {
        path: "stream/blocks/chat/tools/brainstorming/Blog.tsx",
        type: "registry:component",
        target:
          "components/stream-components/blocks/chat/tools/brainstorming/Blog.tsx",
      },
      {
        path: "stream/blocks/chat/tools/brainstorming/utils.tsx",
        type: "registry:component",
        target:
          "components/stream-components/blocks/chat/tools/brainstorming/utils.tsx",
      },
      {
        path: "stream/blocks/chat/tools/brainstorming/useBlogLogic.tsx",
        type: "registry:hook",
        target:
          "components/stream-components/blocks/chat/tools/brainstorming/useBlogLogic.tsx",
      },
      {
        path: "stream/blocks/chat/tools/brainstorming/Brainstorming.tsx",
        type: "registry:component",
        target:
          "components/stream-components/blocks/chat/tools/brainstorming/Brainstorming.tsx",
      },
      {
        path: "stream/blocks/stream-chat-history/chat-history.tsx",
        type: "registry:component",
        target:
          "components/stream-components/blocks/stream-chat-history/chat-history.tsx",
      },
      {
        path: "stream/blocks/chat/artifacts/PreviewAside.tsx",
        type: "registry:component",
        target:
          "components/stream-components/blocks/chat/artifacts/PreviewAside.tsx",
      },
      {
        path: "stream/blocks/chat/artifacts/Reveal.tsx",
        type: "registry:component",
        target: "components/stream-components/blocks/chat/artifacts/Reveal.tsx",
      },
      {
        path: "stream/hooks/use-brandkit-by-id.ts",
        type: "registry:component",
        target: "components/stream-components/hooks/use-brandkit-by-id.ts",
      },
      {
        path: "stream/hooks/use-brandkits.ts",
        type: "registry:component",
        target: "components/stream-components/hooks/use-brandkits.ts",
      },
      {
        path: "stream/hooks/use-contenthub-brandkits.ts",
        type: "registry:component",
        target:
          "components/stream-components/hooks/use-contenthub-brandkits.ts",
      },
      {
        path: "stream/hooks/use-get-chat-messages.ts",
        type: "registry:component",
        target: "components/stream-components/hooks/use-get-chat-messages.ts",
      },
      {
        path: "stream/hooks/use-get-chats.ts",
        type: "registry:component",
        target: "components/stream-components/hooks/use-get-chats.ts",
      },
      {
        path: "stream/lib/utils.ts",
        type: "registry:component",
        target: "components/stream-components/lib/utils.ts",
      },
      {
        path: "stream/ui/stream-icon.tsx",
        type: "registry:component",
        target: "components/stream-components/ui/stream-icon.tsx",
      },
      {
        path: "stream/ui/stream-spinner.tsx",
        type: "registry:component",
        target: "components/stream-components/ui/stream-spinner.tsx",
      },
      {
        path: "stream/blocks/chat/utils/index.ts",
        type: "registry:component",
        target: "components/stream-components/blocks/chat/utils/index.ts",
      },
      {
        path: "stream/blocks/chat/utils/referencesBuilder.ts",
        type: "registry:component",
        target:
          "components/stream-components/blocks/chat/utils/referencesBuilder.ts",
      },
      {
        path: "stream/stream.css",
        type: "registry:component",
        target: "components/stream-components/stream.css",
      },
    ],
    categories: ["stream", "ui", "chat", "messages"],
  },
]
