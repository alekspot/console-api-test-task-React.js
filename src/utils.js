export function setCookie(name, value) {
    document.cookie = `${name}=${value}`;
}

export function deleteCookie(name) {
    document.cookie = `${name}=; max-age=-1`;
}

export class Format {

    static removeSpace(str) {
        return str.replace(/\s/g, '');
    }

    static formatJSON (value) {
        if (!value) {
            return '';
        }

        return JSON.stringify(value, null, 1);
    }
}

export class Validate {
    static hasWhitespace(str) {
        const whitespaceChars = /[\s\t\n\r\f]/g;

        return whitespaceChars.test(str.trim());
    }

    static isCirilic(str) {
        const notCirilicRegex = /^[^а-яА-Я]+$/;

        return !notCirilicRegex.test(str);
    }

    static isJson(str) {
        if (!str) {
            return false;
        }
        
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }

        return true;
    }
}

