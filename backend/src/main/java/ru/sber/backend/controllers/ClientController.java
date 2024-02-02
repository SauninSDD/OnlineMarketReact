package ru.sber.backend.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ru.sber.backend.models.PhoneRequest;
import ru.sber.backend.services.client.ClientTelephoneService;

import java.net.URI;
import java.util.List;

/**
 * Контроллер для обработки запросов к корзине клиента
 */
@Slf4j
@RestController
@RequestMapping("client")
public class ClientController {

    private final ClientTelephoneService clientTelephoneService;

    @Autowired
    public ClientController(ClientTelephoneService clientTelephoneService) {
        this.clientTelephoneService = clientTelephoneService;
    }

    /**
     * Получает все номера пользователя по id
     *
     * @return список телефонов пользователя
     */
    @PreAuthorize("hasRole('client_user')")
    @GetMapping("/phones")
    public ResponseEntity<List<String>> getPhones() {
        log.info("Получение номеров пользователя");
        List<String> clientPhonesList = clientTelephoneService.getAllClientPhonesByClientId();
        log.info("Список номеров пользователя: {}", clientPhonesList);
        return ResponseEntity.ok()
                .body(clientPhonesList);
    }

    /**
     * Добавляет номер телефона
     *
     * @return результат запроса
     */
    @PostMapping("/phones")
    @PreAuthorize("hasRole('client_user')")
    public ResponseEntity<String> addPhone(@RequestBody PhoneRequest phoneRequest) {
        log.info("Создает номер клиента {}", phoneRequest.getPhone());
        var isAdd = clientTelephoneService.addClientPhone(phoneRequest.getPhone());
        if (isAdd) {
            return ResponseEntity.created(URI.create("phones"))
                    .body("Телефон добавлен");
        } else {
            return ResponseEntity.badRequest()
                    .body("Телефон уже привязан к одному из аккаунтов");
        }
    }

    /**
     * Удаляет номер телефона
     *
     * @return результат запроса
     */
    @DeleteMapping("/phones")
    @PreAuthorize("hasRole('client_user')")
    public ResponseEntity<String> deletePhone(@RequestBody PhoneRequest phoneRequest) {
        log.info("Удаляет номер клиента {}", phoneRequest.getPhone());
        var isDeleted = clientTelephoneService.deleteClientPhone(phoneRequest.getPhone());
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
