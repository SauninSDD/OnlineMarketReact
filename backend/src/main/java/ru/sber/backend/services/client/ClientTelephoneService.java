package ru.sber.backend.services.client;

import ru.sber.backend.entities.ClientPhone;
import ru.sber.backend.models.PhoneRequest;

import java.util.List;

public interface ClientTelephoneService {
    boolean addClientPhone(PhoneRequest clientPhone);

    ClientPhone getClientPhone(String clientPhone);

    List<String> getAllClientPhonesByClientId();

    boolean updateClientPhone(ClientPhone clientPhone);

    boolean deleteClientPhone(Long idClientPhone);
}
