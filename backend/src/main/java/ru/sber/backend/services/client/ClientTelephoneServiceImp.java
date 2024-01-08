package ru.sber.backend.services.client;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.sber.backend.entities.ClientPhone;
import ru.sber.backend.models.PhoneRequest;
import ru.sber.backend.repositories.ClientPhoneRepository;

import java.util.List;

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
    public boolean addClientPhone(PhoneRequest phoneRequest) {
        log.info("Добавление заказа");
        var isExistsPhone = clientPhoneRepository.existsByPhone(phoneRequest.getPhone());
        if (!isExistsPhone) {
            ClientPhone clientPhone = ClientPhone.builder()
                    .phone(phoneRequest.getPhone())
                    .idClient(clientService.getIdClient())
                    .build();

            log.info("Добавляет телефон клиента {}", phoneRequest);
            clientPhoneRepository.save(clientPhone);
            return true;
        }
        return false;
    }

    @Override
    public ClientPhone getClientPhone(String idClientPhone) {
        return null;
    }

    @Override
    public List<String> getAllClientPhonesByClientId() {
        List<ClientPhone> clientPhones = clientPhoneRepository.findAllClientPhonesByIdClient(clientService.getIdClient());
        return clientPhones.stream().map(ClientPhone::getPhone).toList();
    }

    @Override
    public boolean updateClientPhone(ClientPhone clientPhone) {
        return false;
    }

    @Override
    public boolean deleteClientPhone(Long idClientPhone) {
        return false;
    }
}
