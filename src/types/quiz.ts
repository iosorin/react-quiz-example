export enum Status {
    success = 'success',
    error = 'error',
}

export type CreateInitialStateType = { quiz: QuizType };

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
    name: string;
    questions: QuizQuestionType[];
};

export type QuizListItemType = QuizType & { id: string };

export type IDWithStatusType = { [key: number]: keyof typeof Status };

export type QuizInitialStateType = {
    quiz: QuizType;
    activeQuestion: number;
    results: IDWithStatusType;
    answerState: IDWithStatusType;
    quizes: QuizListItemType[];
    loading: boolean;
    isFinished: boolean;
    error?: unknown;
};
