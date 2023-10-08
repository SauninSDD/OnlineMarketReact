package ru.sber.backend.services;

import java.util.Date;
import java.util.Optional;

public interface ClientService {
    /**
     * Регистрирует пользователя
     *
     * @param client Данные о пользователе
     * @return Возвращает идентификатор созданного пользователя
     */
    long signUp(User client);

    /**
     * Производит поиск пользователя по id
     *
     * @param clientId Уникальный идентификатор пользователя
     * @return Возвращает найденного пользователя
     */
    Optional<User> getClientById(long clientId);

    /**
     * Проверяет существует ли пользователь
     *
     * @param clientId Уникальный идентификатор пользователя
     * @return Возвращает результат проверки
     */
    boolean checkClientExistence(long clientId);

    /**
     * Удаляет пользователя по id
     *
     * @param clientId Уникальный идентификатор пользователя
     * @return true при удачном удалении и false, если пользователя не существует
     */
    boolean deleteClientById(long clientId);

    /**
     * Получает клиента по его email
     *
     * @param email электронная почта клиента
     * @return клиента по email
     */
    Optional<User> getClientByEmail(String email);

    /**
     * Обновялет информацию о клиенте
     *
     * @param clientId id клиента
     * @param name имя клиента
     * @param dateOfBirth дата рождения клиента
     * @param number номер телефона клиента
     * @return true, если информация о клиенте успешно обновлена
     */
    boolean updateClientInfo(long clientId, String name, Date dateOfBirth, String number);
}
