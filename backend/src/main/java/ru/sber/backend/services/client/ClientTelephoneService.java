package ru.sber.backend.services.client;

import ru.sber.backend.entities.ClientPhone;

import java.util.List;

public interface ClientTelephoneService {
    Long addClientPhone(ClientPhone clientPhone);

    ClientPhone getClientPhone(Long idClientPhone);

    List<ClientPhone> getAllClientPhonesByClientId(Long idClient);

    boolean updateClientPhone(ClientPhone clientPhone);

    boolean deleteClientPhone(Long idClientPhone);
}
