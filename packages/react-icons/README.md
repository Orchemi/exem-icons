# @exem/react-icons

A comprehensive and lightweight icon library for React applications. Featuring **4 stroke weight variants** (light, regular, bold, filled) with **tree-shaking optimization** and **SSR support**.

[![npm version](https://badge.fury.io/js/@exem%2Freact-icons.svg)](https://www.npmjs.com/package/@exem/react-icons)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![Tree Shaking](https://img.shields.io/badge/Tree%20Shaking-✅-green.svg)](#tree-shaking)
[![SSR](https://img.shields.io/badge/SSR-✅-green.svg)](#ssr-support)

<br />

## 🌐 Internationalization

This README is available in:

- [한국어](./README.ko.md)
- English

<br />

## 🎨 Design System

All icons are designed with consistency and built for modern web applications.
**Figma:** [Exemicons Design System](https://www.figma.com/design/M0kYIJxzAJKUqApIAYXvuZ/Exemicons?node-id=0-1&p=f&t=a4VhkCzCYWFNMoAf-0)

_All icons and designs are copyrighted by [Exem](https://www.ex-em.com/)._

<br />

## 🚀 Installation

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

## 📖 Usage

### 🧩 Single Icon (Recommended)

Import specific icons for **optimal tree-shaking** and bundle size.

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

<br />

#### Props

| Property   | Type                      | Default        | Description                  |
| ---------- | ------------------------- | -------------- | ---------------------------- |
| `size`     | `number`                  | `24`           | Width and height of the icon |
| `color`    | `string`                  | `currentColor` | Color of the icon            |
| `...props` | `SVGProps<SVGSVGElement>` | -              | All standard SVG props       |

<br />

#### ✨ Features

- **🌳 Tree-shaking optimized**: Only imports the icons you use
- **📦 Lightweight**: Minimal bundle impact
- **⚡ Best performance**: Direct component import
- **🎨 Consistent**: Same API across all variants

<br />

### 🖼️ Dynamic Icon

Use when you need to change icons dynamically at runtime.

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

      <button onClick={() => setIconName("arrow-down")}>Change Icon</button>
      <button onClick={() => setVariant("light")}>Change Variant</button>
    </div>
  );
};
```

#### Props

| Property   | Type                      | Default          | Description                              |
| ---------- | ------------------------- | ---------------- | ---------------------------------------- |
| `name`     | `ExemIconName`            | **Required**     | Icon name from available icons           |
| `variant`  | `ExemIconVariant`         | **Required**     | Icon variant (light/regular/bold/filled) |
| `size`     | `number`                  | `24`             | Width and height of the icon             |
| `color`    | `string`                  | `'currentColor'` | Color of the icon                        |
| `...props` | `SVGProps<SVGSVGElement>` | -                | All standard SVG props                   |

<br />

#### ✨ Features

- **🔧 Dynamic**: Change icons and variants at runtime
- **🛡️ Type-safe**: Full TypeScript support with autocomplete
- **🖥️ SSR compatible**: Works with Next.js, Remix, etc.
- **⚡ Fast**: Efficient static mapping (no dynamic imports)

<br />

## 🎨 Icon Variants

Choose the perfect weight for your design.

```tsx
import { Heart } from "@exem/react-icons/light"; // Light stroke
import { Heart } from "@exem/react-icons/regular"; // Regular stroke
import { Heart } from "@exem/react-icons/bold"; // Bold stroke
import { Heart } from "@exem/react-icons/filled"; // Filled
```

| Variant   | Use Case                        | Visual Weight |
| --------- | ------------------------------- | ------------- |
| `light`   | Subtle UI, minimal design       | Thin stroke   |
| `regular` | Default UI, body content        | Medium stroke |
| `bold`    | Emphasis, headers, important UI | Thick stroke  |
| `filled`  | Primary actions, active states  | Solid fill    |

---

## 📝 TypeScript Support

Full TypeScript support with auto-completion.

```tsx
import type {
  ExemIconName, // Union of all available icon names
  ExemIconVariant, // 'light' | 'regular' | 'bold' | 'filled'
  ExemIconProps, // Props for ExemIcon component
} from "@exem/react-icons";

// Get all available icon names
const iconList: ExemIconName[] = [
  "arrow-up",
  "arrow-down",
  "chevron-left", // ... etc
];

// Type-safe variant selection
const variant: ExemIconVariant = "filled";
```

<br />

## 🌳 Tree Shaking

This library is optimized for tree-shaking. Import only what you need.

```tsx
// ✅ Good: Only imports ArrowUp from filled variant
import { ArrowUp } from "@exem/react-icons/filled";

// ❌ Avoid: Imports all icons (larger bundle)
import { ExemIcon } from "@exem/react-icons";
```

<br />

## 🖥️ SSR Support

Fully compatible with server-side rendering:

```tsx
// ✅ Works in Next.js, Remix, Gatsby, etc.
import { ArrowUp } from "@exem/react-icons/filled";
import { ExemIcon } from "@exem/react-icons";

// No hydration mismatches
const ServerComponent = () => (
  <div>
    <ArrowUp size={24} />
    <ExemIcon name="arrow-down" variant="light" />
  </div>
);
```

<br />

## 🎯 Best Practices

### For Optimal Performance

```tsx
// ✅ Import specific icons for best tree-shaking
import { Home, Search, User } from "@exem/react-icons/regular";

// ✅ Use consistent variant throughout your app
const icons = {
  home: () => <Home size={20} color="red" />,
  search: () => <Search size={20} />,
  user: () => <User size={20} />,
};
```

<br />

### For Dynamic Use Cases

```tsx
// ✅ Use ExemIcon when icon changes at runtime
const [currentIcon, setCurrentIcon] = useState<ExemIconName>("home");

return <ExemIcon name={currentIcon} variant="regular" size={20} />;
```

<br />

## 🏢 About Exem

Created and maintained by [Exem](https://www.ex-em.com/) for modern React applications.
