const explicitUrl = import.meta.env.VITE_DEV_API_URL || import.meta.env.VITE_PROD_API_URL

export const baseUrl = explicitUrl ? explicitUrl.replace(/\/$/, '')
    : `${window.location.protocol}//${window.location.hostname}:${import.meta.env.VITE_DEV_API_PORT ?? '8000'}`

export function buildUrl(path: string) {
    if (path.startsWith('http://') || path.startsWith('https://'))
        return path;
    
    return `${baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;
}

export default { baseUrl, buildUrl }
