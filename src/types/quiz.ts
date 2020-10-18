export enum Status {
    success = 'success',
    error = 'error',
}

export type QuizQuestionAnswerType = {
    id: number;
    text: string;
};

export type QuizQuestionType = {
    id: number;
    question: string;
    rightAnswerId: number;
    answers: QuizQuestionAnswerType[];
};

export type QuizType = {
    quiz: QuizQuestionType[];
};

export type QuizListItemType = {
    id: string;
    name: string;
};

export type QuizInitialStateType = {
    quiz: QuizQuestionType[];
    activeQuestion: number;
    results: { [key: number]: keyof typeof Status };
    answerState: { [key: number]: keyof typeof Status } | null;
    quizes: QuizListItemType[];
    error: any;
    loading: boolean;
    isFinished: boolean;
};
