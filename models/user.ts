export interface User {
    username: string;
    password: string;
}

export const CORRECT_USER: User = {
    username: 'standard_user',
    password: 'secret_sauce',
};

export const INCORRECT_USER: User = {
    username: 'standard_user',
    password: 'regular_sauce',
};