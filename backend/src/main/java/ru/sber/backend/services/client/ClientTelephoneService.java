package ru.sber.backend.services.client;

import ru.sber.backend.entities.ClientPhone;

import java.util.List;

public interface ClientTelephoneService {
    boolean addClientPhone(String clientPhone);

    List<String> getAllClientPhonesByClientId();

    boolean deleteClientPhone(String clientPhone);
}
