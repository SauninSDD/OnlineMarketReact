package ru.sber.backend.services.client;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.sber.backend.entities.ClientPhone;
import ru.sber.backend.repositories.ClientPhoneRepository;

import java.util.List;
import java.util.Optional;


@Slf4j
@Service
public class ClientTelephoneServiceImp implements ClientTelephoneService {
    private final ClientService clientService;
    private final ClientPhoneRepository clientPhoneRepository;

    @Autowired
    public ClientTelephoneServiceImp(ClientService clientService, ClientPhoneRepository clientPhoneRepository) {
        this.clientService = clientService;
        this.clientPhoneRepository = clientPhoneRepository;
    }

    @Override
    public boolean addClientPhone(String clientPhone) {
        log.info("Добавление заказа");
        var isExistsPhone = clientPhoneRepository.existsByPhone(clientPhone);
        if (!isExistsPhone) {
            ClientPhone addedPhone = ClientPhone.builder()
                    .phone(clientPhone)
                    .idClient(clientService.getIdClient())
                    .build();

            log.info("Добавляет телефон клиента {}", clientPhone);
            clientPhoneRepository.save(addedPhone);
            return true;
        }
        return false;
    }

    @Override
    public List<String> getAllClientPhonesByClientId() {
        List<ClientPhone> clientPhones = clientPhoneRepository.findAllClientPhonesByIdClient(clientService.getIdClient());
        return clientPhones.stream().map(ClientPhone::getPhone).toList();
    }

    @Override
    public boolean deleteClientPhone(String clientPhone) {
        Optional<ClientPhone> deletedPhone = clientPhoneRepository.findClientPhoneByPhoneAndIdClient(clientPhone, clientService.getIdClient());
        if (deletedPhone.isPresent()) {
            clientPhoneRepository.delete(deletedPhone.get());
            log.info("Удален телефон {}", clientPhone);
            return true;
        }
        return false;
    }
}
