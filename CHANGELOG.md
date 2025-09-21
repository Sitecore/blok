# Changelog

All notable changes to this project will be documented in this file. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

Major versions of this project will include breaking changes in core packages and align with Sitecore seasonal releases though not strictly bound to them.

Our versioning strategy is as follows:

- Patch: no breaking changes (e.g. bug fixes, minor improvements)
- Minor: non-breaking feature additions – no breaking changes (e.g. new features, improvements)
- Major: new features + breaking changes (e.g. framework upgrades, major architectural changes, major features)

## Unreleased

### 🎉 New Features & Improvements

* Next.js App Router support:
  - Base template ([#191](https://github.com/Sitecore/content-sdk/pull/191))
  - Robots.txt and Sitemap.xml support ([#197](https://github.com/Sitecore/content-sdk/pull/197))
  - Editing and preview support ([#198](https://github.com/Sitecore/content-sdk/pull/198))
  - Internationalization support ([#202](https://github.com/Sitecore/content-sdk/pull/202))

## 1.1.0

### 🎉 New Features & Improvements

* Add Cursor AI coding agent rules for consistent development patterns across the Content SDK repository ([#207](https://github.com/Sitecore/content-sdk/pull/207))
* `[nextjs]` Support component-level data fetching in 404/500 pages ([#199](https://github.com/Sitecore/content-sdk/pull/199))
* Migration from ESlint 8 -> ESLint 9 and introduction of the new Flat Config file ([#176](https://github.com/Sitecore/content-sdk/pull/176))
* Code generation for Design Library enablers:
  - `[core]` `[nextjs]` Add import-map generation ([#157](https://github.com/Sitecore/content-sdk/pull/157))([#167](https://github.com/Sitecore/content-sdk/pull/167))([#170](https://github.com/Sitecore/content-sdk/pull/170))([#171](https://github.com/Sitecore/content-sdk/pull/171))([#175](https://github.com/Sitecore/content-sdk/pull/175))([#177](https://github.com/Sitecore/content-sdk/pull/177))([#187](https://github.com/Sitecore/content-sdk/pull/187))
    - New `writeImportMap()`, `combineImportEntries()` methods and `defaultImportEntries` export available from `@sitecore-content-sdk/nextjs/codegen`
  - Dynamic component rendering ([#163](https://github.com/Sitecore/content-sdk/pull/163))
  - Updated API endpoint to new Edge Platform format ([#162](https://github.com/Sitecore/content-sdk/pull/162))
  - Ensure editing state is enabled in Design Library mode ([#181](https://github.com/Sitecore/content-sdk/pull/181))
- `[core]` Ensure displayName paths are properly UTF-8 encoded. ([#179](https://github.com/Sitecore/content-sdk/pull/179))
* `[react]` Add `component:status` events for VariantGeneration ([#190](https://github.com/Sitecore/content-sdk/pull/190))
- `[react]` Enhanced the Design Library cache buster format to hh-dd-mm-yyyy ([#188](https://github.com/Sitecore/content-sdk/pull/188))
* `[react]` `[core]` Unite capabilities of library | library-metadata with library-variant-generation modes. `isVariantGeneration` is honored only when `isDesignLibrary`(library | library-metadata) is true and `generation=variant` query string is passed to the editing render endpoint. ([#208](https://github.com/Sitecore/content-sdk/pull/208)) ([#215](https://github.com/Sitecore/content-sdk/pull/215))
- `[nextjs]` Optimization for editing render middleware: issue an internal server request for fetching page data during editing instead of doing temporary redirect ([#195](https://github.com/Sitecore/content-sdk/pull/195)) ([#196](https://github.com/Sitecore/content-sdk/pull/196))
  - added new environment variable `SITECORE_INTERNAL_EDITING_HOST_URL` - the internal host URL for the Next.js application, used for server-side requests for page rendering during editing
  - added a new setting in _sitecore.config_: _sitecoreInternalEditingHostUrl_. This setting allows you to define the internal host URL explicitly, overriding the corresponding environment variable.
  - if none of the above is set:
    - in XM Cloud environment server request will be issued to `http://localhost:3000`
    - in Vercel or Netlify scenarios, the host header of the incoming request will be used to make the internal request

### 🐛 Bug Fixes

* `[nextjs]` Preserve default locale in external absolute urls ([#201](https://github.com/Sitecore/content-sdk/pull/201))
* `[react]` Custom properties are not applied to empty field in editing mode ([#200](https://github.com/Sitecore/content-sdk/pull/200))
* `[core]` Content styles fail to load due to incorrect contextId resolution ([#192](https://github.com/Sitecore/content-sdk/pull/192))
* `[core]` Duplicate dictionary requests in editing, preview, and design library modes ([#161](https://github.com/Sitecore/content-sdk/pull/161))
  - `SitecoreClient.getPreview` and `SitecoreClient.getDesignLibraryData` no longer request dictionary data. `Page` type is not affected.
  - Updated `EditingService.fetchEditingData`:
    - Removed `siteName` parameter.
    - No longer requests and returns dictionary data.
- `[cli]` Code extraction extends XM Cloud Rendering Host build by several minutes ([#173](https://github.com/Sitecore/content-sdk/pull/173))
- `[core]` Fix redirect regex processing to prevent over-escaping of question marks in regex patterns ([#174](https://github.com/Sitecore/content-sdk/pull/174))

## 1.0.1

### 🐛 Bug Fixes

- `[core]` `[nextjs]` Restore proper local connection fallback
  - Added fallback to `middleware.ts` file to enable local API connections in the absence of `contextId`. ([#178](https://github.com/Sitecore/content-sdk/pull/178))([#180](https://github.com/Sitecore/content-sdk/pull/180))

## 1.0.0

### 🎉 New Features & Improvements

### 🛠 Breaking Changes

  #### Reworked `SitecoreProvider` and Context

  #### Updated `withSitecore` and `useSitecore` APIs

  #### Improvements to `SitecoreClient`

  #### DesignLibrary Component


### 🐛 Bug Fixes


### 🧹 Chores


////////////////

# Changelog

## 0.1.0 - 2025-09-20

### 🎉 New Features & Improvements
- [core] Added demo sections for **Colors**, **Typography**, **Shadows**, **Border Radius**, and **Breakpoints** (#3, #4, #5, #6, #7)

- [core] Added **Component Preview** section with rendering and code view (#35, #37)
- [core] Implemented dynamic routing for each component and block page (#33)
- [core] MDX implementation with common components and folder structure (#38, #39, #40)
- [core] Integrated Blok-CN site homepage (#30)
- [core] Added initial registry setup (#1)

#### Components
- Introduced **Chat History** component UI (#36)
- Added **Alert** component (#43)
- Added **Dialog** sizing prop and support for custom `<DialogClose>` (#24)
- Introduced **Drawer** sibling mode for non-portal rendering (#23)
- Added size variant in **Badges** and adapted default font weight (#19)

### 🛠 Breaking Changes
- [core] Migrated **Stream Chat Messages** and **Stream React Components** to Blok-CN (#28, #29)
- [core] Updated icon system to use **Material Design Icons (MDI)** and refactored topbar blocks (#2)

### 🐛 Bug Fixes
- [core] Fixed issue where **form error message icon** was always visible (#12)
- [core] Corrected **padding** on simple button without variant (#14)
- [core] Fixed forgotten variant on demo page (#22)

### 🧹 Chores
- [dependencies] Updated `@sitecore/stream-ui-core` to version `0.1.2` and enhanced stability (#31)
- [core] Multiple design audit rounds and cleanup for button icon sizes and color schemes (#9, #10, #11, #17, #18, #21)




