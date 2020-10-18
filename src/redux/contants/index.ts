export const QUIZES = {
    fetch: {
        start: 'quizes/fetch/start',
        success: 'quizes/fetch/success',
        error: 'quizes/fetch/error',
    },
};

export const QUIZ = {
    retry: 'quiz/retry',
    finish: 'quiz/finish',
    question: {
        next: 'quiz/question/next',
        create: 'quiz/question/create',
    },
    creation: {
        reset: 'quiz/creation/reset',
    },
    state: {
        set: 'quiz/state/set',
    },
    fetch: {
        success: 'quiz/fetch/success',
    },
};

export const AUTH = {
    success: 'auth/success',
    logout: 'auth/logout',
};
