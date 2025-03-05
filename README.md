# Vue 기반 웹 애플리케이션을 위한 UI 프레임워크

## 개요
현대적인 웹 서비스 아키텍처의 변화에 따라 많은 시스템이 백엔드에서 제공하는 REST API를 활용하면서 프론트엔드는 리액티브 프레임워크를 구현하는 방식으로 분리되고 있습니다. 이러한 프론트엔드와 백엔드 컴포넌트의 분리는 독립적인 UI 프레임워크의 필요성을 제기하며, 이는 분리된 서비스 환경에서 필수적입니다.

이 UI 프레임워크는 최소한의 BFF (Backend For Frontend) API를 활용하여 다양한 서비스의 프론트엔드 애플리케이션 개발을 지원하도록 설계되었습니다. 목표는 다재다능한 프론트엔드 UI 애플리케이션 개발을 위한 필수 도구와 환경을 제공하는 것입니다.

## 재사용성을 위한 UI 프레임워크 리팩토링

UI 디자인이 변경될 때마다 재사용성을 강화하기 위해 UI 프레임워크는 리팩토링 과정을 거쳤습니다. 이를 통해 공통 컴포넌트를 수정하여 새로운 디자인 요구사항에 적응하면서도 구조적 재사용이 가능하도록 하였습니다.
- **부트스트랩 스타일링**: 모든 컴포넌트 스타일은 이제 부트스트랩을 사용하며, 이를 통해 컴포넌트 간 일관된 스타일을 유지하고 디자인 조정 과정을 단순화하였습니다.
- **Vue 컴포넌트 변환**: 재사용성을 강화하기 위해 주요 UI 요소들은 Vue 컴포넌트로 변환되었으며, 이를 통해 애플리케이션의 다양한 부분에서 모듈 방식으로 활용 가능합니다.

이 새롭게 구성된 구조는 기본적인 프레임워크를 유지하면서 미래 UI 조정이 가능하도록 지원하며, 효율적이고 유지 가능한 개발 환경을 제공합니다.

### 주요 고려사항
- **대규모 웹 시스템**: 복잡한 요구사항과 높은 사용자 요구를 처리할 수 있는 프레임워크를 목표로 합니다.
- **다양한 개발자 수준**: 초보 개발자와 경험이 풍부한 개발자 모두 접근 가능하도록 설계되어 사용의 용이성과 유연성을 우선시합니다.
- **학습 곡선**: 학습 곡선을 최소화하여 빠른 온보딩과 효율적인 개발을 가능하게 합니다.
- **공통 컴포넌트 구현 및 활용**: 공통 컴포넌트를 포함하여 프로젝트 간 개발 과정을 간소화합니다.
- **빌드/배포 성능**: 빠른 빌드와 효율적인 배포 프로세스를 최적화하여 시장 출시 시간을 단축합니다.

## 주요 기술

### Vite 패키지 매니저
Vite는 Vue 기반 프로젝트를 위한 빠르고 현대적인 개발 환경 및 빌드 도구입니다. 주요 장점으로는 다음을 포함합니다:
- 매우 빠른 빌드와 핫 모듈 교체(HMR).
- 빌드 성능을 개선하는 효율적인 의존성 관리.
- 트리쉐이킹과 코드 스플리팅이 포함된 최적화된 프로덕션 빌드.

### Vue 프레임워크
Vue는 반응형, 컴포넌트 기반 아키텍처를 제공하여 복잡한 UI를 간소화하고 상호작용을 강화합니다:
- 최소한의 코드로 동적 UI 업데이트를 가능하게 하는 반응형 코어 설계.
- 재사용성 및 유지관리를 위한 모듈화된 컴포넌트 기반 구조.
- Vite, Vue Router, Vuex와 같은 도구와의 풍부한 생태계 및 호환성을 제공하여 다양한 프로젝트 요구사항에 대한 원활한 개발 환경을 지원합니다.

### Bootstrap
Bootstrap은 강력하고 기능이 풍부한 프론트엔드 툴킷으로, 프로토타입에서 프로덕션에 이르기까지 빠르게 제작할 수 있는 도구를 제공합니다.

## 애플리케이션 개발 도구

| 도구         | 목적                                               |
|--------------|---------------------------------------------------|
| **Node/NPM** | 자바스크립트 런타임 환경 및 의존성 관리             |
| **VS Code**  | 웹 UI 개발을 위한 IDE                             |

## 프레임워크 실행 방법

UI 프레임워크를 설정하고 실행하려면 다음 절차를 따라야 합니다:

1. **의존성 설치**: `npm install`을 실행하여 필요한 모든 패키지를 설치합니다.
2. **개발 서버 실행**: `npm run dev`를 사용하여 개발 서버를 시작합니다.
3. **DEV 모드에서 모든 메뉴 접근**: 로그인 화면에서 **"노세션"** 버튼을 클릭하여 서버 통합 없이 메인 화면으로 진입합니다. 이를 통해 서버 기반 접근 권한과 관계없이 모든 메뉴를 표시할 수 있습니다.

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
