package ru.sber.backend.services.client;


import ru.sber.backend.entities.ClientCard;

import java.util.List;

public interface ClientCardService {
    Long addClientCard(ClientCard clientCard);

    ClientCard getClientCardByClientCardNumber(String clientCardNumber);

    ClientCard getClientCardByClientId(Long clientId);

    List<ClientCard> getAllClientCardsByClientId(Long clientId);

    boolean deleteClientCard(Long clientCardId);
}
