#!/usr/bin/env node

import meow from 'meow'
import iterate from './index.js'
import { existsSync } from 'node:fs'
const cli = meow(
    `
Usage
    $ bundlesize <pathToReactNativeApp>
    
Options
    --limit, -l <n>              How many commits to iterate over. Default 1.
    --skip, -s <n>               How many commits to skip. Default 0.
    --platform, -p <ios|android>   What platform to build bundle for. Default "ios".
    --entryFile, -e <./index.js> Path to index.js file. Default "./index.js".

Examples
    $ bundlesize .
    $ bundlesize . -l 5 -s 10 -e ./src/index.js

`,
    {
        importMeta: import.meta,
        flags: {
            skip: {
                type: 'number',
                alias: 's',
                default: 0,
            },
            limit: {
                type: 'number',
                alias: 'l',
                default: 1,
            },
            platform: {
                type: 'string',
                alias: 'p',
                default: 'ios',
            },
            entryFile: {
                type: 'string',
                alias: 'e',
                default: './index.js',
            },
        },
    },
)

const { skip, limit, platform, entryFile } = cli.flags
const cwd = cli.input[0]

if (!cwd) {
    cli.showHelp()
} else if (!existsSync(cwd)) {
    console.error(`Path does not exists: ${cwd}`)
} else if (platform !== 'ios' && platform !== 'android') {
    console.error(`Unknown platform: ${platform}`)
} else if (!existsSync(cwd + '/' + entryFile)) {
    console.error(`Entry file does not exists: ${cwd + '/' + entryFile}`)
} else {
    await iterate(cwd, limit, skip, platform, entryFile)
}
