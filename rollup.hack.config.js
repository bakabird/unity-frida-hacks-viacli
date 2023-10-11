import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
    input: '198X-hacks.js',
    output: {
        file: "198X-hacks.js.bundle.js",
        format: 'iife'
    },
    plugins: [nodeResolve()]
};