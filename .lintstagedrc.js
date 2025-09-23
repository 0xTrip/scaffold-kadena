const path = require("path");

const buildNextEslintCommand = (filenames) => {
  // Filter out auto-generated Next.js files  
  const filteredFilenames = filenames.filter(filename =>
    !filename.includes('next-env.d.ts') &&
    !filename.includes('.next/')
  );

  if (filteredFilenames.length === 0) return 'echo "No NextJS files to lint"';

  return `yarn next:lint --fix --file ${filteredFilenames
    .map((f) => path.relative(path.join("packages", "nextjs"), f))
    .join(" --file ")}`;
};

const checkTypesNextCommand = () => "yarn next:check-types";

const buildHardhatEslintCommand = (filenames) =>
  `yarn hardhat:lint-staged --fix ${filenames
    .map((f) => path.relative(path.join("packages", "hardhat"), f))
    .join(" ")}`;

module.exports = {
  "packages/nextjs/**/*.{ts,tsx}": [
    buildNextEslintCommand,
    //checkTypesNextCommand,
  ],
  "packages/hardhat/**/*.{ts,tsx}": [buildHardhatEslintCommand],
};
