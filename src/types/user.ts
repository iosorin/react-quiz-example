export type UserInfoType = {
    providerId: string;
    displayName: string;
    photoUrl: string;
    federatedId: string;
    email: string;
    rawId: string;
    screenName: string;
};

export type UserDataType = {
    localId: string;
    email: string;
    passwordHash: string;
    providerUserInfo: UserInfoType;
    contain: string;
    idToken: string;
    refreshToken: string;
    expiresIn: string;
    displayName?: string;
    photoUrl?: string;
    emailVerified?: string;
};
