# Vue 기반 웹 애플리케이션을 위한 UI 프레임워크

## 개요
현대적인 웹 서비스 아키텍처의 변화에 따라 많은 시스템이 백엔드에서 제공하는 REST API를 활용하면서 프론트엔드는 리액티브 프레임워크를 구현하는 방식으로 분리되고 있습니다. 이러한 프론트엔드와 백엔드 컴포넌트의 분리는 독립적인 UI 프레임워크의 필요성을 제기하며, 이는 분리된 서비스 환경에서 필수적입니다.

이 UI 프레임워크는 최소한의 BFF (Backend For Frontend) API를 활용하여 다양한 서비스의 프론트엔드 애플리케이션 개발을 지원하도록 설계되었습니다. 목표는 다재다능한 프론트엔드 UI 애플리케이션 개발을 위한 필수 도구와 환경을 제공하는 것입니다.

- [사용자 가이드](./user_guide.pptx)

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

이 구조는 애플리케이션을 효과적으로 조직하여 모듈식, 확장 가능, 유지 관리가 용이한 개발을 보장합니다.

## UI 독립성을 위한 메뉴 구성

개발 환경에서는 서버에 의존하지 않고 독립적으로 UI를 렌더링할 수 있는 메뉴 구조를 제공합니다. 이 접근 방식은 클라이언트 측에서 동적 메뉴 관리를 가능하게 하고, `menuID`에 기반한 서버 권한 역할을 설정하도록 설계되었습니다. 다음은 메뉴 관리를 위한 핵심 가이드라인입니다:

### 메뉴 관리 가이드라인
- **UI 메뉴 독립 관리**: 메뉴 계층 구조는 서버와 독립적으로 유지됩니다. 사용자 그룹에 대한 접근 권한을 제공하기 위해 서버는 `menuID`에 기반하여 권한 수준을 할당합니다.
- **접근 제어**: 접근 권한이 없는 메뉴 항목은 숨겨지며, 해당 항목에 대한 라우팅 경로는 생성되지 않습니다. `hidden` 속성을 사용하여 메뉴에는 표시되지 않지만, 라우팅을 통해 직접 접근 가능한 컴포넌트 생성이 가능합니다 (예: 목록 보기에서 상세 보기로 열리는 경우).
- **고유한 경로 및 컴포넌트**: `menuID`는 중복될 수 있지만, 각 라우팅 경로(`path`)와 컴포넌트 참조(`component`)는 고유하게 유지됩니다.
- **접근 레벨**: 각 메뉴 항목의 가시성과 기능(예: 버튼 활성화/비활성화)은 접근 레벨에 따라 제어됩니다: `No Access (0)`, `Read (1)`, `Write (2)`, `Admin (3)`.
- **개발 모드 접근**: `authLevel`이 `-1`로 설정되면, 메뉴 항목은 DEV 환경에서 항상 표시되며, 표준 접근 제어를 우회합니다.


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

## 메뉴 그룹 관리

메뉴 그룹을 효율적으로 관리하기 위해 각 메뉴 그룹은 `menus` 폴더 내에서 개별 파일로 정의되고, 메뉴 스토어(`store-menus.ts`)에 등록됩니다. 이러한 설정은 접근 권한 및 라우팅 요구사항에 따라 독립적이고 모듈화된 메뉴 구성을 가능하게 합니다.

### 메뉴 그룹 파일을 정의하는 단계
1. **`menus` 폴더에 그룹 파일 생성**: 각 메뉴 그룹에 대한 파일을 정의하고, 속성(`id`, `name`, `path`, `component`)과 함께 메뉴 항목을 나열합니다.
2. **접근 권한에 따라 `menuID` 할당**: 동일한 접근 권한 특성을 공유하는 항목에는 동일한 `menuID`를 사용하며, 라우팅 경로와 컴포넌트가 고유하도록 보장합니다.
3. **플레이스홀더 메뉴의 `component`를 ``로 설정**: 컴포넌트가 아직 개발되지 않은 경우, `component`를 ``로 설정합니다. 이를 통해 메뉴 항목의 초기 등록이 가능합니다.
4. **간접적으로 접근하는 페이지에 `hidden` 사용**: 메뉴에서 직접 접근할 수 없지만 다른 화면에서 탐색 가능한 페이지는 `hidden`으로 표시해야 합니다. DEV 모드에서는 `authLevel`을 `-1`로 설정하여 서버 기반 권한 확인을 우회하고 로컬 개발을 용이하게 합니다.
5. **메뉴 스토어에 그룹 파일 등록**: 각 그룹 파일을 `store-menus.ts`의 `menuGroups` 배열에 추가하여 중앙 집중식 메뉴 관리가 가능하도록 합니다.

### `store-menus.ts`에서 그룹 파일을 등록하는 예시

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

모든 백엔드 API 응답은 표준화된 형식을 따르며, 이를 통해 프론트엔드 애플리케이션에서 응답을 일관되게 처리할 수 있습니다.

### API 응답 형식
표준 응답 구조는 다음과 같이 정의됩니다:

```typescript
interface Response {
    result: number,        // 0 for success, 1 for failure
    code: number,          // Error code, provided in case of failure
    message: string,       // Error message, provided in case of failure
    body: object | null    // Response data (object format)
}
```

## 리스트 데이터에 대한 페이지네이션

페이지네이션된 리스트 데이터를 처리할 때, API 요청 및 응답 구조는 페이지 매김을 위한 매개변수를 포함합니다.

### 요청 매개변수

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

## 모달 컴포넌트 사용하기

팝업 스타일의 모달 컴포넌트는 `teleport`를 통해 `<body>` 태그에 등록되며, `store-popups.ts` 스크립트를 통해 트리거할 수 있습니다. 다양한 목적에 맞춰 메시지 유형이 분류되어 있습니다:

### 메시지 유형

- **notifySuccess**: 이벤트가 성공적으로 처리되었을 때 성공 메시지를 표시합니다.
- **notifyInfo**: 이벤트 알림에 대한 정보 메시지를 표시합니다.
- **notifyError**: 이벤트 처리 중 오류가 발생했을 때 오류 메시지를 표시합니다.
- **notifyConfirm**: 사용자에게 확인(확인 또는 취소)을 요청하며, 사용자의 선택에 따라 콜백 함수를 처리합니다.
- **popToast**: 3초 후 자동으로 사라지는 토스트 팝업 스타일 모달 컴포넌트입니다.

이 모듈형 접근 방식은 애플리케이션 내에서 성공, 오류, 정보, 확인 메시지를 일관되고 재사용 가능한 UI 컴포넌트 구조로 처리할 수 있도록 합니다.

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
