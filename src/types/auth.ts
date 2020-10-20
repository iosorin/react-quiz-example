export type AuthInitialStateType = {
    token: null | string;
    userId: null | string;
    email: string;
    expirationDate: null | Date;
};

export type AuthSettings = {
    email: string;
    password: string;
    returnSecureToken?: boolean;
};
