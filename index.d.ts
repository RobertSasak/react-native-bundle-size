export interface BundleInfo {
    hash: string
    size: number
    message: string
    status: 'ok' | 'error'
    error: string | undefined
}

/**
Get react-native bundle size for last commits
*/
export default function iterate(
    cwd: string,
    limit: number,
    skip: number,
    platform: 'ios' | 'android',
    entryFile: string,
): BundleInfo[]
