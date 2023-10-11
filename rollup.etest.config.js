import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
    input: 'enumerator-test.js',
    output: {
        file: "enumerator-test.bundle.js",
        format: 'iife'
    },
    plugins: [nodeResolve()]
};