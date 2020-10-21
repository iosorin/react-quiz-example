export type AuthInitialStateType = {
    token: string;
    user: null | FullUserInfoType;
};

export type UserInfoType = {
    email: string;
    displayName: string;
    photoUrl?: string;
};

export type FullUserInfoType = {
    localId?: string;
    email: string;
    passwordHash?: string;
    providerUserInfo?: UserInfoType & {
        providerId: string;
        federatedId: string;
        rawId: string;
        screenName: string;
    };
    contain?: string;
    idToken?: string;
    refreshToken?: string;
    expiresIn?: string;
    displayName?: string;
    photoUrl?: string;
    emailVerified?: string;
};
