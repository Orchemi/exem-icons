# Exem Icons

**모던 웹 애플리케이션을 위한 엔터프라이즈급 아이콘 라이브러리**

전문 개발팀을 위해 [Exem](https://www.ex-em.com/)이 정교하게 제작한 포괄적이고 고성능의 아이콘 시스템입니다. **일관성**, **성능**, **개발자 경험**을 핵심 가치로 설계되었습니다.

[![Figma Design System](https://img.shields.io/badge/Figma-Design%20System-F24E1E?logo=figma)](https://www.figma.com/design/M0kYIJxzAJKUqApIAYXvuZ/Exemicons?node-id=0-1&p=f&t=a4VhkCzCYWFNMoAf-0)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tree Shaking](https://img.shields.io/badge/Tree%20Shaking-✅-00C853)](tree-shaking)
[![SSR Compatible](https://img.shields.io/badge/SSR-Compatible-FF6B35)](#ssr-support)

<br />

## 🌐 다국어 지원

이 README는 다음 언어로도 제공됩니다.

- 한국어
- [English](./README.md)

<br />

## 🎯 철학

### **엔터프라이즈를 위한 설계**

이 라이브러리에 포함된 모든 아이콘은 **엔터프라이즈 소프트웨어의 까다로운 요구 사항**을 충족하도록 **세심하게 제작**되었습니다. 미묘한 UI 요소부터 강한 CTA 버튼까지, 각각의 스타일은 전문 UI에서 명확한 목적을 갖고 사용됩니다.

<br />

### **성능 중심의 설계**

**트리 셰이킹 최적화**와 **최소한의 런타임 오버헤드**를 염두에 두고 처음부터 설계되었습니다. 필요한 아이콘만 불러올 수 있어, 라이브러리 크기와 관계없이 애플리케이션의 속도와 경량성을 유지할 수 있습니다.

<br />

### **대규모에서도 일관된 품질**

**Light, Regular, Bold, Filled**의 네 가지 균형 잡힌 스타일을 통해 전체 애플리케이션에서 **시각적 일관성**을 유지할 수 있습니다. 대시보드, 모바일 앱, 복잡한 웹 플랫폼 등 어떤 환경에서도 통일된 디자인 언어를 적용할 수 있습니다.

<br />

## 🚀 프레임워크 지원

원하는 프레임워크를 선택하고 바로 시작해보세요.

<br />

### 📦 사용 가능한 패키지

| 프레임워크 | 패키지 / 문서                                     | 상태                |
| ---------- | ------------------------------------------------- | ------------------- |
| **React**  | [`exem-icons-react`](./packages/exem-icons-react) | ✅ **사용 가능**    |
| **Vue 2**  | `exem-icons-vue2`                                 | 🚧 **곧 출시 예정** |
| **Vue 3**  | `exem-icons-vue3`                                 | 🚧 **곧 출시 예정** |

<br />

## ✨ 주요 기능

### 🎨 **4가지 스트로크 굵기(Stroke Width) 스타일**

- **Light**: 미니멀하고 눈에 잘 띄지 않는 인터페이스 요소
- **Regular**: 본문 콘텐츠 및 내비게이션용 표준 굵기
- **Bold**: 강조가 필요한 중요한 UI 구성 요소
- **Filled**: 주요 액션 및 활성 상태에 사용

<br />

### ⚡ **성능 최적화**

- **트리 셰이킹 최적화**: 실제 사용하는 아이콘만 번들에 포함
- **SSR 호환**: Next.js, Nuxt 등과 완벽하게 작동
- **경량 구성**: 아이콘 하나당 약 2KB 이하
- **런타임 의존성 없음**: 순수하게 최적화된 SVG 컴포넌트

<br />

### 🛡️ **개발자 친화적인 경험**

- **완전한 TypeScript 지원**: 자동완성과 타입 안정성 제공
- **모든 프레임워크에서 일관된 API**
- **CSS 커스텀 속성을 활용한 유연한 크기 및 테마 설정**
- **포괄적인 문서와 예제 제공**

<br />

### 🏢 **엔터프라이즈 환경 대응**

- **비즈니스 애플리케이션에 적합한 전문 디자인 언어**
- **대규모 개발팀을 위한 확장 가능한 아키텍처**
- **시맨틱 버저닝을 통한 안정적인 버전 관리**
- **Exem의 지속적인 유지보수와 업데이트 지원**

<br />

## 🎨 디자인 시스템

### **Figma 연동**

모든 아이콘은 **전문적인 Figma 디자인 시스템**에서 관리되어, 디자이너와 개발자가 동일한 기준으로 협업할 수 있습니다.

**👉 [디자인 시스템 보기](https://www.figma.com/design/M0kYIJxzAJKUqApIAYXvuZ/Exemicons?node-id=0-1&p=f&t=a4VhkCzCYWFNMoAf-0)**

<br />

### **디자인 원칙**

- **기하학적 일관성**: 24px 기반 그리드에 수학적 정밀도 적용
- **시각적 균형**: 모든 크기에서 조화를 이루도록 수작업 조정
- **접근성 중시**: 대비와 명확도에서 WCAG 가이드라인 충족

<br />

## 🏢 Exem 소개

**Exem**은 **애플리케이션 성능 모니터링(APM)** 및 **데이터베이스 성능 솔루션** 분야의 선도 기업입니다. 전 세계 엔터프라이즈 고객을 대상으로 20년 이상의 경험을 축적하였으며, 비즈니스 핵심 애플리케이션에서 **성능**, **신뢰성**, **사용자 경험**의 중요성을 깊이 이해하고 있습니다.

<br />

### **Exem이 이 라이브러리를 만든 이유**

- **내부 필요성**: Exem의 자체 엔터프라이즈 소프트웨어 제품군에 전면 사용
- **품질 기준**: 미션 크리티컬 APM 도구와 동일한 기준으로 제작
- **커뮤니티 기여**: 엔터프라이즈 수준 도구를 개발자 커뮤니티와 공유

<br />

## 🚀 시작하기

1. 위의 패키지 중 사용하려는 프레임워크를 선택합니다
2. 원하는 패키지 매니저로 패키지를 설치합니다
3. **트리 셰이킹 방식**으로 아이콘을 가져옵니다
4. **전문 아이콘**을 활용해 더 빠르고 가벼운 애플리케이션을 구축하세요

<br />

<div align="center">

[🌐 Exem 웹사이트](https://www.ex-em.com/) • [📧 문의하기](mailto:tmdgns1126@ex-em.com)

</div>
