import { QuizType, UserType } from '@/types';
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-quiz-8d50b.firebaseio.com/',
});

/* quiz */
export type FetchQuizResponseType = QuizType;
export type NewQuizResponseType = { name: string };
export type FetchQuizesResponseType = { [key: string]: QuizType };

/* auth */
export type AuthResponseType = {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
};

export type AuthUserFetchResponseType = {
    kind: string;
    users: Array<UserType>;
};

const API = {
    quiz: {
        async create(quiz: object, name: string) {
            const res = await instance.post<NewQuizResponseType>('/quizes.json', { ...quiz, name });

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
        async update(settings: { idToken: string | null; email?: string; displayName?: string }) {
            if (!settings.idToken) return;

            const url = this.url('update');
            const res = await axios.post<UserType>(url, { ...settings, returnSecureToken: true });

            return res.data;
        },
        async fetchUser(idToken: string) {
            const url = this.url('lookup');
            const res = await axios.post<AuthUserFetchResponseType>(url, { idToken });

            return res.data.users[0];
        },
        updateUser(idToken: string | null, user: UserType) {
            return this.update({ idToken, ...user });
        },
        updateUserEmail(idToken: string | null, email: string) {
            return this.update({ idToken, email });
        },
    },
};

export default API;
