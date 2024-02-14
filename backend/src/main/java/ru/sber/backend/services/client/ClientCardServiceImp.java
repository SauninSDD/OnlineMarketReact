package ru.sber.backend.services.client;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.sber.backend.entities.client.ClientCard;
import ru.sber.backend.models.client.AddClientCardRequest;
import ru.sber.backend.repositories.ClientCardRepository;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class ClientCardServiceImp implements ClientCardService {

    private final ClientService clientService;
    private final ClientCardRepository clientCardRepository;

    @Autowired
    public ClientCardServiceImp(ClientService clientService, ClientCardRepository clientCardRepository) {
        this.clientService = clientService;
        this.clientCardRepository = clientCardRepository;
    }

    @Override
    public boolean addClientCard(AddClientCardRequest addClientCardRequest) {
        log.info("Добавление карты");
        var isExistsCard = clientCardRepository.existsByClientCardNumber(addClientCardRequest.getClientCardNumber());
        if (!isExistsCard) {
            ClientCard addedCard = ClientCard.builder()
                    .clientCardNumber(addClientCardRequest.getClientCardNumber())
                    .clientCardCvc(addClientCardRequest.getClientCardCvc())
                    .clientCardExpirationDate(addClientCardRequest.getClientCardExpirationDate())
                    .clientCardOwner(addClientCardRequest.getClientCardOwner())
                    .idClient(clientService.getIdClient())
                    .build();

            log.info("Добавляет карту клиента в бд {}", addedCard);
            clientCardRepository.save(addedCard);
            return true;
        }
        return false;
    }

    @Override
    public Optional<ClientCard> getClientCard(Long clientCardId) {
        return clientCardRepository.findById(clientCardId);
    }

    @Override
    public List<String> getAllClientCardsByClientId() {
        List<ClientCard> clientCards = clientCardRepository.findAllClientCardsByIdClient(clientService.getIdClient());
        return clientCards.stream().map(ClientCard::getClientCardNumber).toList();
    }

    @Override
    public boolean deleteClientCard(String clientCardNumber) {
        Optional<ClientCard> deletedCard = clientCardRepository.findClientCardByClientCardNumberAndIdClient(clientCardNumber, clientService.getIdClient());
        if (deletedCard.isPresent()) {
            clientCardRepository.delete(deletedCard.get());
            log.info("Удалена карта {}", clientCardNumber);
            return true;
        }
        return false;
    }
}
