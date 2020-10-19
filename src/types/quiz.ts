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

export type IDWithStatusType = { [key: number]: keyof typeof Status };

export type QuizInitialStateType = {
    quiz: QuizQuestionType[];
    activeQuestion: number;
    results: IDWithStatusType;
    answerState: IDWithStatusType;
    quizes: QuizListItemType[];
    loading: boolean;
    isFinished: boolean;
    error?: any;
};
