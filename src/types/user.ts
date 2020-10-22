export type UserType = {
    email: string;
    displayName: string;
    photoUrl?: string;
    localId?: string;
    providerUserInfo?: UserType & {
        providerId: string;
        federatedId: string;
        rawId: string;
        screenName: string;
    };
    passwordHash?: string;
    contain?: string;
    idToken?: string;
    refreshToken?: string;
    expiresIn?: string;
    emailVerified?: string;
};

export type UserInitialStateType = {
    user: UserType;
};
