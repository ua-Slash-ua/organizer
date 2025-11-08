// Тип для опису схеми валідації
type ValidationRule =
    | 'string'
    | 'number'
    | 'boolean'
    | 'array'
    | 'object'
    | { [key: string]: ValidationRule };

export type SchemaDefinition = {
    [key: string]: ValidationRule;
};

/**
 * Універсальна функція валідації
 * @param data - Дані для перевірки (може бути що завгодно)
 * @param schema - Схема валідації
 * @returns true якщо дані відповідають схемі
 */
export function validateSchema<T>(
    data: unknown,
    schema: SchemaDefinition
): data is T {
    // Перевірка на null/undefined
    if (data === null || data === undefined) return false;

    // Якщо схема порожня, повертаємо true
    if (Object.keys(schema).length === 0) return true;

    // Якщо data не об'єкт, але схема очікує поля
    if (typeof data !== 'object') return false;

    const dataObj = data as Record<string, unknown>;

    // Перевіряємо кожне поле зі схеми
    for (const [key, rule] of Object.entries(schema)) {
        const value = dataObj[key];

        // Якщо поле відсутнє
        if (value === undefined) return false;

        // Якщо правило - примітивний тип
        if (typeof rule === 'string') {
            if (!checkPrimitiveType(value, rule)) return false;
        }
        // Якщо правило - вкладений об'єкт
        else if (typeof rule === 'object') {
            if (!validateSchema(value, rule)) return false;
        }
    }

    return true;
}

/**
 * Перевірка примітивних типів
 */
function checkPrimitiveType(value: unknown, expectedType: string): boolean {
    switch (expectedType) {
        case 'string':
            return typeof value === 'string';
        case 'number':
            return typeof value === 'number' && !isNaN(value);
        case 'boolean':
            return typeof value === 'boolean';
        case 'array':
            return Array.isArray(value);
        case 'object':
            return typeof value === 'object' && value !== null && !Array.isArray(value);
        default:
            return false;
    }
}

/**
 * Валідація масиву
 */
export function validateArray<T>(
    data: unknown,
    itemSchema: SchemaDefinition
): data is T[] {
    if (!Array.isArray(data)) return false;

    return data.every(item => validateSchema<T>(item, itemSchema));
}


