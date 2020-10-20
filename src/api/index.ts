import { QuizType } from '@/types/quiz';
import axios from 'axios';
import { AuthSettings } from '@/types/auth';

const instance = axios.create({
    baseURL: 'https://react-quiz-8d50b.firebaseio.com/',
});

/* quiz */
type FetchQuizResponseType = QuizType;
type NewQuizResponseType = { name: string };
type FetchQuizesResponseType = { [key: string]: QuizType };

/* auth */
type AuthResponseType = {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
};

const API = {
    all() {
        return instance.get<FetchQuizesResponseType>('/quizes.json').then((res) => res.data);
    },
    get(uid: string) {
        return instance.get<FetchQuizResponseType>('/quizes/' + uid + '.json').then((res) => res.data);
    },
    new(quiz: unknown) {
        return instance.post<NewQuizResponseType>('/quizes.json', quiz).then((res) => res.data);
    },
    auth(settings: AuthSettings, isLogin: boolean) {
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp';

        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword';
        }

        url += '?key=AIzaSyDvCB39YSBlxgKvakS19CkGTPgv_Qb3_pw';

        return axios.post<AuthResponseType>(url, settings).then((res) => res.data);
    },
};

export default API;
