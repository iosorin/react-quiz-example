import { QuizType, UserDataType } from '@/types';
import axios from 'axios';

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
    quiz: {
        async create(quiz: unknown) {
            const res = await instance.post<NewQuizResponseType>('/quizes.json', quiz);

            return res.data;
        },
        async read(uid: string) {
            const res = await instance.get<FetchQuizResponseType>('/quizes/' + uid + '.json');

            return res.data;
        },
        async all() {
            const res = await instance.get<FetchQuizesResponseType>('/quizes.json');

            return res.data;
        },
    },

    account: {
        BASE_URL: 'https://identitytoolkit.googleapis.com/v1/accounts:',
        API_KEY: '?key=AIzaSyDvCB39YSBlxgKvakS19CkGTPgv_Qb3_pw',
        url(s: string) {
            return this.BASE_URL + s + this.API_KEY;
        },
        async auth(email: string, password: string, isLogin: boolean) {
            const url = this.BASE_URL + (isLogin ? 'signInWithPassword' : 'signUp') + this.API_KEY;
            const settings = { email, password, returnSecureToken: true };

            const res = await axios.post<AuthResponseType>(url, settings);

            return res.data;
        },
        async changeEmail(idToken: string, email: string) {
            const url = this.url('update');
            const settings = { email, idToken, returnSecureToken: true };

            const res = await axios.post<UserDataType>(url, settings);

            return res.data;
        },
        changePassword() {
            console.log('changePassword');
        },
        updateProfile() {
            console.log('updateProfile');
        },
    },
};

export default API;
