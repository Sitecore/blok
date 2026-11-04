import {
  pageHeaderCodeFiles,
  pageHeaderSiteSummaryCodeFiles,
  pageHeaderSiteSummaryWhiteCodeFiles,
  pageHeaderTopNavMiniCodeFiles,
} from "@/lib/docsite/blok-demo-code-files";

/**
 * The blok is designed for a ~1284px application shell, so the docs preview is
 * scaled down here (outside the demo source) to keep the copyable code clean.
 */
const PAGE_HEADER_PREVIEW = {
  contentClassName: "items-stretch",
  wrapperClassName: "w-full min-w-0 max-w-[1284px] [zoom:0.82]",
};

export const pageHeader = {
  name: "page-header",
  preview: {
    defaultComponent: "page-header",
    codeFiles: pageHeaderCodeFiles,
    ...PAGE_HEADER_PREVIEW,
  },
  usage: {
    usage: [
      `import {
  PageHeader,
  PageHeaderTop,
  PageHeaderMedia,
  PageHeaderMain,
  PageHeaderBack,
  PageHeaderHeading,
  PageHeaderTitle,
  PageHeaderStatus,
  PageHeaderSeparator,
  PageHeaderDescription,
  PageHeaderTags,
  PageHeaderAside,
  PageHeaderActions,
  PageHeaderPeople,
  PageHeaderFooter,
  PageHeaderTabs,
  PageHeaderTimeline,
} from "@/components/bloks/page-header";`,
      `<PageHeader surface="card">
  <PageHeaderTop>
    <PageHeaderMedia>{/* optional thumbnail */}</PageHeaderMedia>
    <PageHeaderMain>
      <PageHeaderBack>Back to portfolio</PageHeaderBack>
      <PageHeaderHeading>
        <PageHeaderTitle>Page title</PageHeaderTitle>
        <PageHeaderSeparator />
        <PageHeaderStatus>{/* Badge + DropdownMenu */}</PageHeaderStatus>
      </PageHeaderHeading>
      <PageHeaderDescription>Supporting description</PageHeaderDescription>
      <PageHeaderTags>{/* Badge pills */}</PageHeaderTags>
    </PageHeaderMain>
    <PageHeaderAside>
      <PageHeaderActions>
        <Button>Primary</Button>
      </PageHeaderActions>
      <PageHeaderPeople>{/* Avatar stack */}</PageHeaderPeople>
    </PageHeaderAside>
  </PageHeaderTop>
  <PageHeaderFooter>
    <PageHeaderTabs>{/* Tabs line */}</PageHeaderTabs>
    <PageHeaderTimeline>{/* Progress + dates */}</PageHeaderTimeline>
  </PageHeaderFooter>
</PageHeader>`,
    ],
  },
  components: {
    "Site summary": {
      component: "page-header-site-summary",
      codeFiles: pageHeaderSiteSummaryCodeFiles,
      ...PAGE_HEADER_PREVIEW,
    },
    "Top nav mini": {
      component: "page-header-top-nav-mini",
      codeFiles: pageHeaderTopNavMiniCodeFiles,
      ...PAGE_HEADER_PREVIEW,
    },
    "Site summary white": {
      component: "page-header-site-summary-white",
      codeFiles: pageHeaderSiteSummaryWhiteCodeFiles,
      ...PAGE_HEADER_PREVIEW,
    },
  },
};
