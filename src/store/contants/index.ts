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
        reset: 'quiz/creation/reset' as const,
    },
    state: {
        set: 'quiz/state/set' as const,
    },
    fetch: {
        success: 'quiz/fetch/success' as const,
    },
};

export const AUTH = {
    success: 'auth/success' as const,
    logout: 'auth/logout' as const,
};
