export function isCEP(cep: string) {
    const objER = /^[0-9]{5}-[0-9]{3}$/;

    if (cep.length > 0) {
        if (objER.test(cep)) return true;
        else return false;
    }
}
