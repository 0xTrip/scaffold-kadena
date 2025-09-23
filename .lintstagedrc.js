const path = require("path");

const buildNextEslintCommand = (filenames) => {
  // Filter out auto-generated Next.js files
  const filteredFilenames = filenames.filter(filename =>
    !filename.includes('next-env.d.ts') &&
    !filename.includes('.next/') &&
    filename.includes('packages/nextjs/')
  );

  if (filteredFilenames.length === 0) return 'echo "No NextJS files to lint"';

  return `yarn next:lint --fix --file ${filteredFilenames
    .map((f) => path.relative(path.join("packages", "nextjs"), f))
    .join(" --file ")}`;
};

const checkTypesNextCommand = () => "yarn next:check-types";

const buildHardhatEslintCommand = (filenames) => {
  // Only process files that are actually in the hardhat package
  const hardhatFilenames = filenames.filter(filename =>
    filename.includes('packages/hardhat/')
  );

  if (hardhatFilenames.length === 0) return 'echo "No Hardhat files to lint"';

  return `yarn hardhat:lint-staged --fix ${hardhatFilenames
    .map((f) => path.relative(path.join("packages", "hardhat"), f))
    .join(" ")}`;
};

module.exports = {
  "packages/nextjs/**/!(next-env).{ts,tsx}": [
    buildNextEslintCommand,
    //checkTypesNextCommand,
  ],
  "packages/hardhat/**/*.{ts,tsx}": [buildHardhatEslintCommand],
};
