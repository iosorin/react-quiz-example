export * from './root';
export * from './auth';
export * from './user';
export * from './quiz';

export type NotificationType = {
    type: 'default' | 'success' | 'info' | 'danger';
    message: string;
    show: boolean;
};
