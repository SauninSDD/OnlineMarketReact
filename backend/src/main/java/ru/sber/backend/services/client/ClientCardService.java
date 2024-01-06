package ru.sber.backend.services.client;


import ru.sber.backend.entities.ClientCard;

import java.util.List;

public interface ClientCardService {
    Long addClientCard(ClientCard clientCard);

    ClientCard getClientCardByClientCardNumber(String clientCardNumber);

    ClientCard getClientCardByClientId(Long idClient);

    List<ClientCard> getAllClientCardsByClientId(Long idClient);

    boolean deleteClientCard(Long idClientCard);
}
