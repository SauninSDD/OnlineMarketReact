import axios from "axios";

/**
 * Запрос для сброса пароля по email
 * @constructor
 */
const forgotPassword = (email: string) => {
    return axios.put(`/api/auth/reset-password`, {email: email})
        .then((response) => response.data)
        .catch((error) => {
            console.error(error);
            throw new Error("Ошибка при отправке запроса на сброс пароля.");
        });
};

/**
 * Запрос для обновления пароля
 * @constructor
 */
const resetPassword = (token: string | undefined, password: string, confirmPassword: string) => {
    return axios.put(`/reset-password?token=${token}`, {password, confirmPassword})
        .then((response) => response.data)
        .catch((error) => {
            console.error(error);
            throw new Error("Ошибка при сбросе пароля");
        });
};

const ResetPasswordService = {
    forgotPassword,
    resetPassword,
};

export default ResetPasswordService;
