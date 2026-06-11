// TODO: Rever estas rotas quando passar para produção
// Criar elas no startWeb.sh talvez????
export const baseUrl = (import.meta.env.VITE_DEV_API_URL ?? import.meta.env.VITE_PROD_API_URL ?? '').replace(/\/$/, '')

export function buildUrl(path: string) {
    if (path.startsWith('http://') || path.startsWith('https://'))
        return path;
    
    return `${baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;
}

export default { baseUrl, buildUrl }
