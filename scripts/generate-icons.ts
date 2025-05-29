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

async function generateReactComponent(svgCode: string, componentName: string) {
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
      fill: 'none',
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
      const tsxCode = await generateReactComponent(svgCode, componentName);
      const outPath = path.join(OUT_DIR, `${componentName}.tsx`);
      await fs.writeFile(outPath, tsxCode, "utf8");
      console.log(`Generated: ${outPath}`);
    }
  }
}

main();
