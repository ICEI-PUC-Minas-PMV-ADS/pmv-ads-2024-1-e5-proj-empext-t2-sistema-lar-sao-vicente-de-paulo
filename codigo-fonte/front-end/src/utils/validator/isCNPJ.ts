export function isCNPJ(cnpj: any) {
    function getVerificationCode1() {
        let total = 0;
        let mod = 0;
        const factors = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        const nums = cnpj.substr(0, 12).split('');

        for (let i = 0; i < nums.length; i++) {
            total += nums[i] * factors[i];
        }

        mod = total % 11;
        return mod < 2 ? 0 : 11 - mod;
    }

    function getVerificationCode2(code1: any) {
        let total = 0;
        let mod = 0;
        const factors = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        const nums = (cnpj.substr(0, 12) + code1).split('');

        for (let i = 0; i < nums.length; i++) {
            total += nums[i] * factors[i];
        }

        mod = total % 11;
        return mod < 2 ? 0 : 11 - mod;
    }

    cnpj = cnpj.replace(/[^0-9]/g, '');

    if (cnpj.length < 14) return false;

    const verificationCode1 = cnpj.substr(-2, 1);
    const verificationCode2 = cnpj.substr(-1, 1);

    const code1 = getVerificationCode1();
    const code2 = getVerificationCode2(code1);

    return code1 == verificationCode1 && code2 == verificationCode2;
}
