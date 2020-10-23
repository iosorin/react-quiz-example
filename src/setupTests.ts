// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

// const localStorageMock = {
//     getItem: jest.fn(),
//     setItem: jest.fn(),
//     removeItem: jest.fn(),
//     clear: jest.fn(),
//     key: jest.fn(),
//     get length() {
//         return 1;
//     },
// };

let store: { [key: string]: string } = {};
const mockLocalStorage = {
    getItem: (key: string): string | null => {
        return key in store ? store[key] : null;
    },
    setItem: (key: string, value: string) => {
        store[key] = value;
    },
    removeItem: (key: string) => {
        delete store[key];
    },
    clear: () => {
        store = {};
    },
    get length() {
        return Object.keys(store).length;
    },
    key: function (i: number) {
        const keys = Object.keys(store);

        return keys[i] || null;
    },
};

global.localStorage = mockLocalStorage;
