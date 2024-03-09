import {
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    registerDecorator,
} from 'class-validator';

@ValidatorConstraint()
export class IsCNPJConstraint implements ValidatorConstraintInterface {
    validate(cnpj: any) {
        if (!cnpj) return false;

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

        if (cnpj.length < 14) return false;

        cnpj = cnpj.replace(/[^0-9]/g, '');

        const verificationCode1 = cnpj.substr(-2, 1);
        const verificationCode2 = cnpj.substr(-1, 1);

        const code1 = getVerificationCode1();
        const code2 = getVerificationCode2(code1);

        if (
            code1 !== Number(verificationCode1) &&
            code2 !== Number(verificationCode2)
        )
            return false;

        return true;
    }

    defaultMessage() {
        return 'CNPJ no formato incorreto';
    }
}

export function IsCNPJ(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'IsCNPJ',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsCNPJConstraint,
        });
    };
}
