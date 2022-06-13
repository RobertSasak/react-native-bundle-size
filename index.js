import fs from 'node:fs'
import util from 'node:util'
import child_process from 'node:child_process'

const stat = util.promisify(fs.stat)
const exec = util.promisify(child_process.exec)

export default async function iterate(cwd, limit, skip, platform, entryFile) {
    let results = []
    await exec(
        `git log --pretty="oneline" --max-count="${limit}" --skip="${skip}"`,
        {
            cwd,
        },
    ).then(async ({ stdout }) => {
        const commits = stdout.trim().split('\n')
        for (let i = 0; i < commits.length; i++) {
            const l = commits[i]
            const j = l.indexOf(' ')
            const hash = l.slice(0, j)
            const shortHash = hash.substring(0, 8)
            const message = l.slice(j + 1)
            if (i !== 0) {
                await exec(`git checkout "${hash}"`, { cwd })
            }
            const bundlePath = `bundleSize.jsbundle`
            try {
                await exec('yarn', { cwd })
                await exec(
                    `npx react-native bundle --dev false --platform "${platform}" --entry-file "${entryFile}" --bundle-output "${bundlePath}"  --reset-cache`,
                    { cwd },
                )
                const { size } = await stat(`${cwd}/${bundlePath}`)
                results.push({ hash, size, message, status: 'ok' })
                console.log(shortHash, size, message)
            } catch (error) {
                results.push({ hash, status: 'error', error })
                console.error(shortHash, error)
            }
        }
    })
    return results
}
