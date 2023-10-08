package ru.sber.backend.exceptions;

public class ClientNotFoundException extends RuntimeException {
    /**
     * Выбрасывает сообщение если клиент не найден
     *
     * @param message сообщение об ошибке
     */
    public ClientNotFoundException(String message) {
        super(message);
    }
}
