# UI Framework for Vue-based Web Applications

## Overview
With the modern shift in web service architecture, many systems now leverage REST APIs provided by the backend while implementing reactive frameworks on the frontend. This separation of frontend and backend components calls for an independent UI framework capable of handling common web service concerns, which is essential in a decoupled service environment. 

This UI framework is designed to support frontend application development across various services by utilizing a minimal set of BFF (Backend For Frontend) APIs. The goal is to offer the necessary tools and environment for developing versatile frontend UI applications.

## UI Framework Refactoring for Reusability

In response to every UI design changes, the UI framework has undergone a refactoring process. This approach allows for structural reusability while adapting to updated design requirements by modifying common components.
- **Bootstrap Styling**: All component styles now use Bootstrap, ensuring consistent styling across components and simplifying the design adjustment process.
- **Vue Component Conversion**: To enhance reusability, core UI elements have been converted into Vue components, allowing for modular use across different parts of the application.

This refactored structure supports future UI adjustments without compromising the underlying framework, fostering efficient and maintainable development.

### Key Considerations
- **Large-scale Web Systems**: The framework should be suitable for applications with complex requirements and high user demand.
- **Diverse Developer Levels**: Designed to be approachable by both beginner and experienced developers, the framework prioritizes ease of use and flexibility.
- **Learning Curve**: Minimizes the learning curve to facilitate rapid onboarding and efficient development.
- **Common Component Implementation and Utilization**: Includes reusable common components to streamline development across projects.
- **Build/Deployment Performance**: Optimized for fast builds and efficient deployment processes to reduce time-to-market.

## Key Technologies

### Vite Package Manager
Vite is a fast, modern development environment and build tool for Vue-based projects. It offers:
- Lightning-fast builds and hot module replacement (HMR).
- Efficient dependency management that improves build performance.
- Optimized production build with tree-shaking and code splitting.

### Vue Framework
Vue provides a reactive, component-based architecture that simplifies complex UIs and enhances interactivity:
- A reactive core design that enables dynamic UI updates with minimal code.
- Modular, component-based structure for reusability and maintainability.
- Rich ecosystem and compatibility with tools like Vite, Vue Router, and Vuex, empowering seamless development for various project requirements.

### Bootstrap
Bootstrap is a powerful, feature-packed frontend toolkit. Build anything—from prototype to production—in minutes.

## Application Development Tools

| Tool        | Purpose                                        |
|-------------|------------------------------------------------|
| **Node/NPM** | JavaScript runtime environment and dependency management |
| **VS Code** | IDE for Web UI development                    |

## Running the Framework

To set up and run the UI framework:

1. **Install Dependencies**: Run `npm install` to install all necessary packages.
2. **Start the Development Server**: Use `npm run dev` to launch the development server.
3. **Access All Menus in DEV Mode**: On the login screen, click the **"노세션"** button to enter the main screen without server integration. This will display all menus regardless of server-based access permissions.

## Application Package Structure

| Directory/File                | Description                                           | Notes                         |
|-------------------------------|-------------------------------------------------------|-------------------------------|
| `public/`                     | Public assets accessible in the root of the project   | Contains `favicon.ico`, `login.png` |
| `src/`                        | Primary source code for the application               | Core development files        |
| `src/components/`             | Reusable UI components                               | Organized for modularity      |
| `src/components/teleports/`   | Teleport components for rendering outside the DOM tree | Useful for modals, dialogs    |
| `src/menus/`                  | Menu configuration and components                    | Manages navigational elements |
| `src/pages/`                  | Primary page-level components                        | Includes major views          |
| `src/pages/domains/`          | Domain-specific page components                      | Custom pages per domain       |
| `src/test/`                   | Testing files for unit and integration tests         | Helps ensure code quality     |
| `src/guides/`                 | Documentation and guides for development standards   | For developer reference       |
| `src/scripts/`                | Various utility scripts and API functions            | Contains helper functions     |
| ├─ `api-call.ts`              | Core API call functions                              | Manages API interactions      |
| ├─ `api-util.ts`              | Utility functions for API handling                   | Supports API operations       |
| ├─ `batch.ts`                 | Batch processing functions                           | Handles grouped operations    |
| ├─ `session.ts`               | Session management utilities                         | Manages user sessions         |
| ├─ `store-cache.ts`           | Cache storage utilities                              | Manages local caching         |
| ├─ `store-callbacks.ts`       | Callback storage utilities                           | Handles callback functions    |
| ├─ `store-menus.ts`           | Utilities for managing menus                         | For dynamic menu configurations |
| ├─ `store-popups.ts`          | Utilities for managing popups                        | Manages modals and notifications |
| ├─ `time-util.ts`             | Utilities for time-related calculations              | Manages date and time formatting |
| ├─ `utils.ts`                 | General-purpose utility functions                    | Shared helper functions       |
| └─ `validater.ts`             | Validation utilities for form data                   | Manages input validation      |
| `App.vue`                     | Root Vue component                                   | Main application wrapper      |
| `main.ts`                     | Application entry point                              | Initializes the app           |
| `router.ts`                   | Router configuration for navigation                  | Sets up page routes           |
| `vite-env.d.ts`               | Type definitions for Vite                            | Supports TypeScript typings   |
| `.env.dev`                    | Environment variables for development                | Holds dev-specific configs    |
| `.env.prd`                    | Environment variables for production                 | Holds production configs      |
| `.gitignore`                  | Git ignore file                                     | Excludes files from version control |
| `README.md`                   | Project documentation                                | Provides an overview and setup guide |
| `index.html`                  | Root HTML file for the app                           | Serves as the main HTML page  |
| `package-lock.json`           | Dependency lock file                                | Ensures consistent dependencies |
| `package.json`                | Project metadata and dependencies                    | Lists libraries and scripts   |
| `tsconfig.json`               | TypeScript configuration file                        | Sets TypeScript options       |
| `tsconfig.node.json`          | TypeScript configuration for Node                    | For Node-specific modules     |
| `vite.config.ts`              | Vite configuration file                              | Configures Vite for the app   |

This structure organizes the application effectively, ensuring modular, scalable, and maintainable development.

## Menu Configuration for UI Independence

In the development environment, the menu structure enables independent UI rendering without server dependency. This approach is designed to allow for dynamic menu management on the client side, with server authorization roles based on `menuID`. Here are the core guidelines for menu management:

### Menu Management Guidelines
- **Independent Management of UI Menus**: Menu hierarchy is maintained independently of the server. To provide access permissions for user groups, the server assigns permission levels based on `menuID`.
- **Controlled Access**: Menu items without access permissions are hidden, and routing paths are not generated for these items. The `hidden` attribute allows for component creation that doesn’t appear in the menu but can be accessed directly via routing (e.g., opening a detail view from a list view).
- **Unique Paths and Components**: While `menuID`s can be duplicated, each routing path (`path`) and component reference (`component`) remains unique.
- **Access Levels**: Each menu item’s visibility and functionality (e.g., button enable/disable) are controlled based on access levels: `No Access (0)`, `Read (1)`, `Write (2)`, `Admin (3)`.
- **Development Mode Access**: When `authLevel` is set to `-1`, the menu item is always visible in DEV environments, bypassing standard access controls.

### Menu Attributes

| Attribute   | Description                                                             | Notes                                                     |
|-------------|-------------------------------------------------------------------------|-----------------------------------------------------------|
| `groupId`   | Unique identifier for each menu group                                   | Used for grouping related menu items                      |
| `groupName` | Display name for the menu group                                         | Appears in the menu UI                                    |
| `menuList`  | Array of menu items within the group                                    | Contains the individual menu entries                      |
| `menuId`    | ID that aligns with the server’s user group access permissions          | Used for server-based authorization checks                |
| `menuName`  | Display name for the menu item                                          | Visible to users in the menu                              |
| `hidden`    | Boolean flag for hidden menus, which allows route-only access           | Useful for detail views accessed via direct routing       |
| `path`      | Unique routing path for the menu item                                   | Required for Vue Router path configuration                |
| `component` | Vue component associated with the menu item                             | Path to the component file, if applicable                 |
| `authLevel` | Permission level required to access the menu item                       | Values: `-1` for DEV, `0` No Access, `1` Read, `2` Write, `3` Admin |

### Menu Example

Below is an example of how to define a menu group and its items:

```javascript
export default {
  groupId: "batch-menus",
  groupName: "배치(Batch)",
  menuList: [
    {
      menuId: "/main/batch",
      menuName: "배치(Batch)",
      hidden: true,
      path: "/main/batch",
      component: () => import(`@/pages/domains/batch/BatchMain.vue`)
    },
    {
      menuId: "/main/batch",
      menuName: "배치작업관리",
      path: "/main/batch/BatchSchedules",
      component: () => import(`@/pages/domains/batch/components/BatchSchedules.vue`)
    },
    {
      menuId: "/main/batch",
      menuName: "On-demand배치",
      path: "/main/batch/OndemandBatch",
      component: () => import(`@/pages/domains/batch/components/OndemandBatch.vue`)
    },
    {
      menuId: "/main/batch",
      menuName: "화면없는 메뉴",
      path: "/main/batch/Empty",
      component: null
    }
  ]
}
```

## Menu Group Management

To manage menu groups efficiently, each menu group is defined in a separate file within the `menus` folder and registered in the menu store (`store-menus.ts`). This setup allows for independent and modular menu configuration based on access permissions and routing requirements.

### Steps for Defining a Menu Group File
1. **Create a Group File in the `menus` Folder**: Define a file for each menu group and list its menu items with attributes (`id`, `name`, `path`, `component`).
2. **Assign `menuID` by Access Permissions**: Use the same `menuID` for items that share the same access permission characteristics, ensuring that routing paths and components are unique.
3. **Set `component` to `null` for Placeholder Menus**: If a component is not yet developed, set `component` to `null`. This allows for early registration of the menu item.
4. **Use `hidden` for Indirectly Accessed Pages**: Pages that are not directly accessible in the menu but can be navigated to from other screens should be marked as `hidden`. For DEV mode, set `authLevel` to `-1` to bypass server-based authorization and facilitate local development.
5. **Register the Group File in the Menu Store**: Add each group file to the `menuGroups` array in `store-menus.ts` for centralized menu management.

### Example of Registering Group Files in `store-menus.ts`

```javascript
// Import menu group files
import guideGroup from "@/menus/guide-group";
import sessionGroup from "@/menus/session-group";
import batchGroup from "@/menus/batch-group";
import sagaGroup from "@/menus/saga-group";
import ssoLinks from "@/menus/sso-links";

// Add all menus to menuGroups
export const menuGroups = [] as MenuGroup[];
menuGroups.push(guideGroup as MenuGroup);
menuGroups.push(sessionGroup as MenuGroup);
menuGroups.push(batchGroup as MenuGroup);
menuGroups.push(sagaGroup as MenuGroup);
menuGroups.push(ssoLinks as MenuGroup);
```

## Backend API Integration

All backend API responses are expected to follow a standardized format, allowing for consistent handling of responses in the frontend application.

### API Response Format
The standard response structure is defined as follows:

```typescript
interface Response {
    result: number,        // 0 for success, 1 for failure
    code: number,          // Error code, provided in case of failure
    message: string,       // Error message, provided in case of failure
    body: object | null    // Response data (object format)
}
```

## Pagination for List Data

When handling paginated list data, the API request and response structure includes parameters for paging.

### Request Parameters

| Parameter | Description                        |
|-----------|------------------------------------|
| `count`   | Number of items per page           |
| `offset`  | Page offset; first page is `0`     |

### Response Format for Paginated Data
The `body` of a paginated response follows the `PagedList` format:

```typescript
interface PagedList {
    total: number,          // Total item count; if sequential data is provided without counting load, -1 indicates data remains, 0 indicates no data remains
    count: number,          // Number of items on the current page
    offset: number,         // Page offset; first page is 0
    list: array             // Array of list data items
}
```
Example Usage
```javascript
const table = reactive({
    headers: [
        { label: "순번", value: "no" },
        { label: "코드그룹명", value: "codeGroupName" },
        { label: "코드그룹ID", value: "codeGroupId" }
    ],
    items: [] as any,
})

const page = reactive({
    total: 0,
    current: 1,
    count: 10,
})

const getCodeGroups = async () => {
    table.items.length = 0

    const url = '/api/code-group/list'
    const queryParams = {
        keyword: keyword.value,
        count: page.count,
        offset: page.current - 1
    }
    const { body: pagedList } = await apiCall.get(url, null, queryParams)
    if (pagedList) {
        page.total = pagedList.total
        page.current = pagedList.offset + 1
        table.items = pagedList.list
        ascendArray(table.items, 'codeGroupName')
        setSequence(table.items, (page.current - 1) * page.count + 1)
    }
}
```

## Using Modal Components

Popup-style modal components are registered to the `<body>` tag via `teleport` and can be triggered through the `store-popups.ts` script. Different message types are categorized for various purposes:

### Message Types

- **notifySuccess**: Displays a success message when an event is processed successfully.
- **notifyInfo**: Shows an informational message for event notifications.
- **notifyError**: Presents an error message when an event processing error occurs.
- **notifyConfirm**: Prompts the user for confirmation (OK or Cancel) and processes a callback function based on the user's selection.
- **popToast**: A toast popup-style modal component that disappears after 3 seconds.

This modular approach allows for versatile notification handling within the application, accommodating success, error, information, and confirmation prompts with a consistent, reusable UI component structure.

```javascript
import { notifyConfirm } from '@/scripts/store-popups'

const startJob = async () => {
    notifyConfirm(`[${props.operation.jobName}] 작업을 시작 할까요?`, async (yes: boolean) => {
        if (yes) {
            const requestBody = { ...props.operation }
            requestBody.jobParameters = null
            const url = '/batch/api/operation/start'
            await apiCall.post(url, null, requestBody)
        }
    })
}
```