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
const VARIANTS = ["light", "medium", "bold", "filled"];

async function ensureOutDir() {
  await fs.ensureDir(OUT_DIR);
}

function getComponentName(file: string, variant: string) {
  const base = file.replace(/\.svg$/, "");
  return (
    camelcase(base, { pascalCase: true }) +
    camelcase(variant, { pascalCase: true })
  );
}

async function generateReactComponent(
  svgCode: string,
  componentName: string,
  variant: string
) {
  return transform.sync(
    svgCode,
    {
      icon: true,
      typescript: true,
      jsxRuntime: "automatic",
      prettier: true,
      plugins: ["@svgr/plugin-jsx"],
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
      ${variant === "filled" ? "fill: color" : "fill: 'none'"},
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
  await ensureOutDir();
  const allIconNames: string[] = [];
  const allComponentNames: string[] = [];
  for (const variant of VARIANTS) {
    const variantDir = path.join(ICONS_DIR, variant);
    if (!(await fs.pathExists(variantDir))) continue;
    const files = (await fs.readdir(variantDir)).filter((f) =>
      f.endsWith(".svg")
    );
    for (const file of files) {
      const svgPath = path.join(variantDir, file);
      const svgCode = await fs.readFile(svgPath, "utf8");
      const componentName = getComponentName(file, variant);
      const tsxCode = await generateReactComponent(
        svgCode,
        componentName,
        variant
      );
      const outPath = path.join(OUT_DIR, `${componentName}.tsx`);
      await fs.writeFile(outPath, tsxCode, "utf8");
      console.log(`Generated: ${outPath}`);
      const kebabName = file.replace(/\.svg$/, "");
      allIconNames.push(kebabName);
      allComponentNames.push(componentName);
    }
  }

  const indexPath = path.resolve(OUT_DIR, "../index.ts");
  const indexContent =
    allComponentNames
      .map((name) => `export { ${name} } from './icons/${name}';`)
      .join("\n") +
    '\nexport { ExemIcon } from "./ExemIcon";\nexport type { ExemIconName, ExemIconVariant } from "./types";\n';
  await fs.writeFile(indexPath, indexContent, "utf8");
  console.log(`Generated: ${indexPath}`);

  const typesPath = path.resolve(OUT_DIR, "../types.ts");
  const typesContent =
    "export type ExemIconName =\n" +
    allIconNames.map((name) => `  | '${name}'`).join("\n") +
    ";\n" +
    '\nexport type ExemIconVariant =\n  | "light"\n  | "medium"\n  | "bold"\n  | "filled";\n';
  await fs.writeFile(typesPath, typesContent, "utf8");
  console.log(`Generated: ${typesPath}`);

  const exemIconPath = path.resolve(OUT_DIR, "../ExemIcon.tsx");
  const exemIconContent = `
import * as React from 'react';
import * as Icons from './index';
import type { ExemIconName, ExemIconVariant } from './types';

export interface ExemIconProps {
  name: ExemIconName;
  variant: ExemIconVariant;
  size?: number;
  color?: string;
  [key: string]: any;
}

function toComponentName(name: string, variant: ExemIconVariant) {
  return (
    name
      .split('-')
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join('') +
    variant.charAt(0).toUpperCase() + variant.slice(1)
  );
}

export const ExemIcon: React.FC<ExemIconProps> = ({ name, variant, size = 24, color = 'currentColor', ...props }) => {
  const componentName = toComponentName(name, variant);
  const IconComponent = (Icons as any)[componentName];
  if (!IconComponent) return null;
  return <IconComponent size={size} color={color} {...props} />;
};
`;
  await fs.writeFile(exemIconPath, exemIconContent, "utf8");
  console.log(`Generated: ${exemIconPath}`);
}

main();
