package ru.sber.backend.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.sber.backend.services.ClientService;

import java.util.Optional;


@Slf4j
@RestController
@RequestMapping("clients")
public class ClientController {
    private final ClientService clientService;

    @Autowired
    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    /**
     * Находит пользователя по идентификатору
     *
     * @param clientId id пользователя
     * @return пользователь с ограниченным количеством полей
     */
    @GetMapping("/{clientId}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable long clientId) {

        log.info("Выводим данные о пользователе с id: {}", clientId);

        Optional<User> user = clientService.getClientById(clientId);

        if (user.isPresent()) {
            UserResponse userResponse = new UserResponse(user.get());
            return ResponseEntity.ok().body(userResponse);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Обновляет информацию о клиенте
     *
     * @param clientId id клиента
     * @param client объект клиента
     * @return статус выполнения
     */
    @PutMapping("/{clientId}")
    public ResponseEntity<?> updateClientInfo(@PathVariable long clientId, @RequestBody User client) {

        log.info("Изменяется информацию о клиенте");

        boolean recordUpdated = clientService.updateClientInfo(clientId, client.getUsername(), client.getDateOfBirth(), client.getNumber());

        if (recordUpdated) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Удаляет пользователя по идентификатору
     *
     * @param clientId Уникальный идентификатор клиента
     * @return статус выполнения
     */
    @DeleteMapping("/{clientId}")
    public ResponseEntity<?> deleteClient(@PathVariable long clientId) {

        log.info("Удаляем клиента с id: {}", clientId);

        boolean isDeleted = clientService.deleteClientById(clientId);

        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
