import esbuild from 'esbuild';

const requirePolyfill = `
  import path from 'path';
  import { fileURLToPath } from 'url';
  import { createRequire as topLevelCreateRequire } from 'module';
  const require = topLevelCreateRequire(import.meta.url);
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
`;

esbuild
  .build({
    entryPoints: ['src/server.js'],
    bundle: true,
    platform: 'node',
    target: 'node16',
    format: 'esm',
    loader: {
      '.js': 'jsx',
      '.jsx': 'jsx',
    },
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
    outfile: 'dist/server.mjs',
    banner: {
      js: requirePolyfill,
    },
  })
  .then(() => {
    console.info('[esbuild] 서버 빌드완료');
  })
  .catch((e) => {
    console.info('빌드실패');
    process.exit(1);
  });
