interface FormRule {
    [key: string]: {
        required?: boolean;
        maxLength?: number;
        minLength?: number;
        pattern?: RegExp;
        email?: boolean;
        number?: boolean;
        compareNumber?: string;
        date?: boolean;
        compareDate?: string;
    };
}

interface FormData {
    [key: string]: any;
}

interface ErrorObject {
    [key: string]: string | boolean;
}

export const useValidation = () => {
    const validateForm = (formRule: FormRule, formData: FormData): ErrorObject => {
        const error: ErrorObject = {};
        for (const field in formRule) {
            const fieldsRule = formRule[field];
            const value = formData[field] || '';

            if (fieldsRule.required && !value) {
                error[field] = 'required';
                continue;
            }
            if (fieldsRule.pattern && !fieldsRule.pattern.test(value)) {
                error[field] = 'pattern';
                continue;
            }
            if (fieldsRule.email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    error[field] = 'email';
                    continue;
                }
            }
            if (fieldsRule.minLength && value.length < fieldsRule.minLength) {
                error[field] = 'minLength';
            }
            if (fieldsRule.maxLength && value.length > fieldsRule.maxLength) {
                error[field] = 'maxLength';
            }
            if (fieldsRule.number && isNaN(value)) {
                error[field] = 'number';
                continue;
            }
            if (fieldsRule.compareNumber) {
                const [rule, valueCompare] = fieldsRule.compareNumber.split(' ');
                const compareValue = !isNaN(Number(valueCompare)) ? Number(valueCompare) : formData[valueCompare];
                compareNumber(value, rule, compareValue) ? null : (error[field] = 'compareNumber');
            }
            if (fieldsRule.date) {
                checkDate(value) ? null : (error[field] = 'date');
            }
            if (fieldsRule.compareDate) {
                const [rule, , valueCompare = fieldsRule.compareDate.split(' ')[1]] = fieldsRule.compareDate.split(' ');
                compareDate(value, rule, valueCompare) ? null : (error[field] = 'compareDate');
            }

            if (!error[field]) {
                error[field] = false;
            }
        }
        return error;
    };

    const compareNumber = (value: any, rule: string, valueCompare: any): boolean => {
        if (!isNaN(valueCompare)) {
            switch (rule) {
                case '>':
                    return value > valueCompare;
                case '>=':
                    return value >= valueCompare;
                case '<':
                    return value < valueCompare;
                case '<=':
                    return value <= valueCompare;
                default:
                    return value === valueCompare;
            }
        }
        return false;
    };

    const checkDate = (value: string): boolean => {
        const regex = /^\d{2}-\d{2}-\d{4}$/;
        if (!regex.test(value)) {
            return false;
        }
        const [day, month, year] = value.split('-').map(Number);
        if (month < 1 || month > 12) {
            return false;
        }
        const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
        if (month === 2 && isLeapYear) {
            daysInMonth[1] = 29;
        }
        if (day < 1 || day > daysInMonth[month - 1]) {
            return false;
        }
        return true;
    };

    const compareDate = (value: string, rule: string, valueCompare: string): boolean => {
        const d1 = new Date(value).getTime();
        const d2 = valueCompare === 'today' ? new Date().getTime() : new Date(valueCompare).getTime();
        switch (rule) {
            case '>':
                return d1 > d2;
            case '>=':
                return d1 >= d2;
            case '<':
                return d1 < d2;
            case '<=':
                return d1 <= d2;
            default:
                return d1 === d2;
        }
    };

    return { validateForm };
};
