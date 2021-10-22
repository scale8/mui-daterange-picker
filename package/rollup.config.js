import typescript from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import resolve from 'rollup-plugin-node-resolve';
import url from 'rollup-plugin-url';

import pkg from './package.json';

const commonjsOptions = {
  include: 'node_modules/**',
  // left-hand side can be an absolute path, a path
  // relative to the current directory, or the name
  // of a module in node_modules
  namedExports: {
    'node_modules/react/index.js': [
      'cloneElement',
      'createContext',
      'Component',
      'createElement',
    ],
    'node_modules/react-dom/index.js': ['render', 'hydrate'],
    'node_modules/react-is/index.js': [
      'isElement',
      'isFragment',
      'isValidElementType',
      'ForwardRef',
      'Memo',
    ],
  },
}

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [
    external(),
    url({ exclude: ['**/*.svg'] }),
    babel({
      exclude: 'node_modules/**',
    }),
    resolve(),
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true,
    }),
    commonjs(commonjsOptions),
  ],
};
