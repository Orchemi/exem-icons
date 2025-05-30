import fs from "fs-extra";
import path from "node:path";
import { fileURLToPath } from "node:url";
import camelcase from "camelcase";
import { transform } from "@svgr/core";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ICONS_DIR = path.resolve(__dirname, "../icons");
const OUT_DIR = path.resolve(
  __dirname,
  "../packages/exem-icons-react/src/icons"
);
const VARIANTS = ["light", "regular", "bold", "filled"];

async function ensureOutDirs() {
  // 각 variant별 폴더 생성 (src/icons 하위)
  for (const variant of VARIANTS) {
    await fs.ensureDir(path.join(OUT_DIR, variant));
  }
  // src/icons 디렉토리 확보
  await fs.ensureDir(OUT_DIR);
  // src 디렉토리 확보
  await fs.ensureDir(path.resolve(OUT_DIR, ".."));
  // 메인 디렉토리(루트)도 확보
  await fs.ensureDir(path.resolve(OUT_DIR, "../.."));
}

function getComponentName(file: string) {
  const base = file.replace(/\.svg$/, "");
  return camelcase(base, { pascalCase: true });
}

// SVG 전처리
function preprocessSvg(svgCode: string) {
  let processed = svgCode.replace(/black/g, "color");

  return processed;
}

async function generateReactComponent(
  svgCode: string,
  componentName: string,
  variant: string
) {
  const isFilled = variant === "filled";
  const processedSvg = preprocessSvg(svgCode);
  return transform.sync(
    processedSvg,
    {
      icon: true,
      typescript: true,
      jsxRuntime: "automatic",
      prettier: true,
      plugins: ["@svgr/plugin-jsx"],
      replaceAttrValues: {
        fill: isFilled ? "color" : "none",
        stroke: "color",
      },
      template: (variables, { tpl }) => {
        return tpl`
import * as React from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export const ${variables.componentName} = ({ size = 24, color = 'currentColor', ...props }: IconProps) => (
  React.cloneElement(
    ${variables.jsx},
    {
      width: size,
      height: size,
      ${isFilled ? "fill: color" : "fill: 'none'"},
      stroke: color,
      ...props,
    }
  )
);
`;
      },
    },
    { componentName }
  );
}

async function main() {
  await ensureOutDirs();

  // variant별 아이콘 정보 저장
  const variantData: Record<
    string,
    { iconNames: string[]; componentNames: string[] }
  > = {};
  const allIconNames: string[] = [];

  for (const variant of VARIANTS) {
    const variantDir = path.join(ICONS_DIR, variant);
    if (!(await fs.pathExists(variantDir))) continue;

    const files = (await fs.readdir(variantDir)).filter((f) =>
      f.endsWith(".svg")
    );
    const iconNames: string[] = [];
    const componentNames: string[] = [];

    for (const file of files) {
      const svgPath = path.join(variantDir, file);
      const svgCode = await fs.readFile(svgPath, "utf8");
      const componentName = getComponentName(file);
      const tsxCode = await generateReactComponent(
        svgCode,
        componentName,
        variant
      );

      // variant별 폴더에 컴포넌트 저장
      const outPath = path.join(OUT_DIR, variant, `${componentName}.tsx`);
      await fs.writeFile(outPath, tsxCode, "utf8");
      console.log(`Generated: ${outPath}`);

      const kebabName = file.replace(/\.svg$/, "");
      iconNames.push(kebabName);
      componentNames.push(componentName);

      // 전체 아이콘 이름 목록에 추가 (중복 제거)
      if (!allIconNames.includes(kebabName)) {
        allIconNames.push(kebabName);
      }
    }

    variantData[variant] = { iconNames, componentNames };

    // variant별 index.ts 생성
    const variantIndexPath = path.join(OUT_DIR, variant, "index.ts");
    const variantIndexContent =
      componentNames
        .map((name) => `export { ${name} } from './${name}';`)
        .join("\n") + "\n";
    await fs.writeFile(variantIndexPath, variantIndexContent, "utf8");
    console.log(`Generated: ${variantIndexPath}`);
  }

  // 메인 types.ts 생성 (src에)
  const typesPath = path.resolve(OUT_DIR, "../types.ts");
  const typesContent =
    "export type ExemIconName =\n" +
    allIconNames.map((name) => `  | '${name}'`).join("\n") +
    ";\n" +
    '\nexport type ExemIconVariant =\n  | "light"\n  | "regular"\n  | "bold"\n  | "filled";\n';
  await fs.writeFile(typesPath, typesContent, "utf8");
  console.log(`Generated: ${typesPath}`);

  // 메인 ExemIcon.tsx 생성 (src에, icons 하위 참조)
  const exemIconPath = path.resolve(OUT_DIR, "../ExemIcon.tsx");
  const exemIconContent = `
import * as React from 'react';
import type { ExemIconName, ExemIconVariant } from './types';

// 모든 variant별 아이콘을 정적으로 import (SSR 호환)
import * as LightIcons from './icons/light/index';
import * as RegularIcons from './icons/regular/index';
import * as BoldIcons from './icons/bold/index';
import * as FilledIcons from './icons/filled/index';

export interface ExemIconProps {
  name: ExemIconName;
  variant: ExemIconVariant;
  size?: number;
  color?: string;
  [key: string]: any;
}

function toComponentName(name: string) {
  return name
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
}

// variant별 아이콘 맵핑
const iconMaps = {
  light: LightIcons,
  regular: RegularIcons,
  bold: BoldIcons,
  filled: FilledIcons,
} as const;

export const ExemIcon: React.FC<ExemIconProps> = ({ name, variant, size = 24, color = 'currentColor', ...props }) => {
  const componentName = toComponentName(name);
  const IconComponent = (iconMaps[variant] as any)[componentName];
  
  if (!IconComponent) {
    console.warn(\`Icon "\${componentName}" not found in variant "\${variant}"\`);
    return null;
  }
  
  return <IconComponent size={size} color={color} {...props} />;
};
`;
  await fs.writeFile(exemIconPath, exemIconContent, "utf8");
  console.log(`Generated: ${exemIconPath}`);

  // 메인 index.ts 생성 (src에, ExemIcon + 타입만)
  const mainIndexPath = path.resolve(OUT_DIR, "../index.ts");
  const mainIndexContent = `export { ExemIcon } from "./ExemIcon";
export type { ExemIconName, ExemIconVariant } from "./types";
`;
  await fs.writeFile(mainIndexPath, mainIndexContent, "utf8");
  console.log(`Generated: ${mainIndexPath}`);
}

main();
