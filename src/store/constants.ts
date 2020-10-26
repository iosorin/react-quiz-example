export const QUIZES = {
    fetch: {
        start: 'quizes/fetch/start' as const,
        success: 'quizes/fetch/success' as const,
        error: 'quizes/fetch/error' as const,
    },
};

export const QUIZ = {
    retry: 'quiz/retry' as const,
    finish: 'quiz/finish' as const,
    question: {
        next: 'quiz/question/next' as const,
        create: 'quiz/question/create' as const,
    },
    creation: {
        finish: 'quiz/creation/finish' as const,
        reset: 'quiz/creation/reset' as const,
        first: 'quiz/creation/first' as const,
    },
    state: {
        set: 'quiz/state/set' as const,
    },
    fetch: {
        success: 'quiz/fetch/success' as const,
    },
};

export const AUTH = {
    logout: 'auth/logout', // defined as const in action creator
    success: 'auth/success' as const,
    error: 'auth/error' as const,
};

export const USER = {
    fetch: 'user/fetch' as const,
    update: 'user/update' as const,
};

export const NOTIFICATION = {
    show: 'notification/show',
    hide: 'notification/hide',
};
