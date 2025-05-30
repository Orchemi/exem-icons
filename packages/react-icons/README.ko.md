# @exem/react-icons

React 애플리케이션용 포괄적인 아이콘 라이브러리입니다. **4가지 굵기 스타일**(light, regular, bold, filled)을 제공하며, **트리 셰이킹 최적화** 및 **SSR 지원**을 갖췄습니다.

[![npm version](https://badge.fury.io/js/@exem%2Freact-icons.svg)](https://www.npmjs.com/package/@exem/react-icons)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![Tree Shaking](https://img.shields.io/badge/Tree%20Shaking-✅-green.svg)](#tree-shaking)
[![SSR](https://img.shields.io/badge/SSR-✅-green.svg)](#ssr-support)

<br />

## 🌐 다국어 지원

이 README는 다음 언어로 제공됩니다:

- 한국어
- [English](./README.md)

<br />

## 🎨 디자인 시스템

모든 아이콘은 일관성을 갖고 설계되었으며, 현대적인 웹 애플리케이션을 위해 구축되었습니다.  
**Figma:** [Exemicons 디자인 시스템](https://www.figma.com/design/M0kYIJxzAJKUqApIAYXvuZ/Exemicons?node-id=0-1&p=f&t=a4VhkCzCYWFNMoAf-0)

_모든 아이콘 및 디자인의 저작권은 [Exem](https://www.ex-em.com/)에 있습니다._

<br />

## 🚀 설치

```bash
npm install @exem/react-icons
```

```bash
yarn add @exem/react-icons
```

```bash
pnpm install @exem/react-icons
```

<br />

## 📖 사용법

### 🧩 단일 아이콘 (권장)

**최적의 트리 셰이킹**과 번들 크기 최소화를 위해 개별 아이콘을 import 하세요.

```tsx
import { ArrowUp, ChevronDown, Search } from "@exem/react-icons/filled";
import { Home, Settings } from "@exem/react-icons/light";

const MyComponent = () => {
  return (
    <div>
      <ArrowUp size={24} color="#3b82f6" />
      <Search classNames="search-icon" />
    </div>
  );
};
```

#### Props

| 속성       | 타입                      | 기본값           | 설명                 |
| ---------- | ------------------------- | ---------------- | -------------------- |
| `size`     | `number`                  | `24`             | 아이콘의 너비와 높이 |
| `color`    | `string`                  | `'currentColor'` | 아이콘 색상          |
| `...props` | `SVGProps<SVGSVGElement>` | -                | 표준 SVG 속성        |

<br />

#### ✨ 특징

- **🌳 트리 셰이킹 최적화**: 사용하는 아이콘만 번들에 포함
- **📦 경량**: 번들 용량 최소화
- **⚡ 고성능**: 직접 컴포넌트를 import 하여 사용
- **🎨 일관된 API**: 모든 스타일에서 동일한 사용법 제공

<br />

### 🖼️ 동적 아이콘

런타임에 아이콘을 동적으로 변경해야 할 경우 사용합니다.

```tsx
import {
  ExemIcon,
  type ExemIconName,
  type ExemIconVariant,
} from "@exem/react-icons";
import { useState } from "react";

const DynamicComponent = () => {
  const [iconName, setIconName] = useState<ExemIconName>("arrow-up");
  const [variant, setVariant] = useState<ExemIconVariant>("filled");

  return (
    <div>
      <ExemIcon name={iconName} variant={variant} size={24} color="#ef4444" />

      <button onClick={() => setIconName("arrow-down")}>아이콘 변경</button>
      <button onClick={() => setVariant("light")}>굵기 변경</button>
    </div>
  );
};
```

<br />

#### Props

| 속성       | 타입                      | 기본값         | 설명                                 |
| ---------- | ------------------------- | -------------- | ------------------------------------ |
| `name`     | `ExemIconName`            | **필수**       | 아이콘 이름                          |
| `variant`  | `ExemIconVariant`         | **필수**       | 스타일: light, regular, bold, filled |
| `size`     | `number`                  | `24`           | 아이콘 크기                          |
| `color`    | `string`                  | `currentColor` | 색상                                 |
| `...props` | `SVGProps<SVGSVGElement>` | -              | 표준 SVG 속성                        |

<br />

#### ✨ 특징

- **🔧 동적 변경 가능**: 런타임에 아이콘 및 스타일 변경 가능
- **🛡️ 타입 안전**: 자동완성을 지원하는 TypeScript 지원
- **🖥️ SSR 호환**: Next.js, Remix 등에서 정상 동작
- **⚡ 빠른 렌더링**: 동적 import 없이 정적 매핑 방식 사용

<br />

## 🎨 아이콘 스타일

디자인 목적에 따라 적절한 굵기를 선택하세요.

```tsx
import { Heart } from "@exem/react-icons/light"; // 얇은 선
import { Heart } from "@exem/react-icons/regular"; // 기본 굵기
import { Heart } from "@exem/react-icons/bold"; // 굵은 선
import { Heart } from "@exem/react-icons/filled"; // 채워진 형태
```

| 스타일    | 용도                            | 시각적 굵기 |
| --------- | ------------------------------- | ----------- |
| `light`   | 미묘한 UI, 미니멀한 디자인      | 얇음        |
| `regular` | 일반 UI, 본문 콘텐츠            | 중간 굵기   |
| `bold`    | 강조, 제목, 중요한 UI 구성 요소 | 굵음        |
| `filled`  | 주요 액션, 활성화된 상태        | 채워진 형태 |

---

## 📝 TypeScript 지원

완전한 타입 지원 및 자동완성을 제공합니다.

```tsx
import type {
  ExemIconName,
  ExemIconVariant,
  ExemIconProps,
} from "@exem/react-icons";

const iconList: ExemIconName[] = [
  "arrow-up",
  "arrow-down",
  "chevron-left", // ...
];

const variant: ExemIconVariant = "filled";
```

<br />

## 🌳 트리 셰이킹

이 라이브러리는 트리 셰이킹을 위한 최적화가 되어 있습니다.

```tsx
// ✅ 권장: 필요한 아이콘만 개별 import
import { ArrowUp } from "@exem/react-icons/filled";

// ❌ 비권장: 모든 아이콘 포함으로 번들 크기 증가
import { ExemIcon } from "@exem/react-icons";
```

<br />

## 🖥️ SSR 지원

서버 사이드 렌더링(SSR)을 완벽하게 지원합니다.

```tsx
import { ArrowUp } from "@exem/react-icons/filled";
import { ExemIcon } from "@exem/react-icons";

const ServerComponent = () => (
  <div>
    <ArrowUp size={24} />
    <ExemIcon name="arrow-down" variant="light" />
  </div>
);
```

<br />

## 🎯 사용 예시

### 최적의 성능을 위한 사용 예

```tsx
import { Home, Search, User } from "@exem/react-icons/regular";

const icons = {
  home: () => <Home size={20} color="red" />,
  search: () => <Search size={20} />,
  user: () => <User size={20} />,
};
```

<br />

### 동적 사용 예

```tsx
const [currentIcon, setCurrentIcon] = useState<ExemIconName>("home");

return <ExemIcon name={currentIcon} variant="regular" size={20} />;
```

<br />

## 🏢 Exem 소개

이 라이브러리는 [Exem](https://www.ex-em.com/)에서 모던 React 애플리케이션을 위해 개발 및 유지보수되고 있습니다.
