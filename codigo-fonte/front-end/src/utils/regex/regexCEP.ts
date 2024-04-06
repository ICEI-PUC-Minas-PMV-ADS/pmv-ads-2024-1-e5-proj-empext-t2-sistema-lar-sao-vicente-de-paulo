// 00000-000
export function regexCEP(value: string): string {
    return value
        .replace(/\D/g, '')
        .replace(/^(\d{5})(\d{3})/, '$1-$2')
        .replace(/(-\d{3})\d+?$/, '$1'); // captura 3 numeros seguidos de um traço e não deixa ser digitado mais nada
}