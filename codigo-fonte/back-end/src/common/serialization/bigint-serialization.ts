export function BigIntSerialization(value) {
    if (value !== undefined) {
        return JSON.stringify(value, (_, v) =>
            typeof v === 'bigint' ? `${v}n` : v,
        );
    }
}
