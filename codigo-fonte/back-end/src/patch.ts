Object.defineProperty(BigInt.prototype, 'toJSON', {
    writable: true,
    configurable: true,
    enumerable: false,
    value: function () {
        // converte para uma string em algum formato específico
        return Number(this);
    },
});
