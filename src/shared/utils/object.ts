export function flattenObject<T>(obj: T, parentKey = "") {
    const result: Record<string, any> = {};

    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const propName = parentKey ? `${parentKey}.${key}` : key;
            const value = obj[key];

            if (typeof value === "object" && value !== null && !Array.isArray(value)) {
                Object.assign(result, flattenObject(value, propName));
            } else if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    const arrayPropName = `${propName}.${index}`;
                    if (typeof item === "object" && item !== null) {
                        Object.assign(result, flattenObject(item, arrayPropName));
                    } else {
                        result[arrayPropName] = item;
                    }
                });
            } else {
                result[propName] = value;
            }
        }
    }
    return result;
};

export function substituteValue<T>(obj: Record<string, T>, newValue: T): Record<string, T> {
    const result: Record<string, T> = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            result[key] = newValue;
        }
    }
    return result;
}