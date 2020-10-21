export default {
    email: (value: string) => /^\S+@\S+\.\S{2,3}$/.test(value),
    required: (value: string) => value && value.trim().length,
    minLength: (value: string, minLength: number) => value && value.length >= minLength,
};
