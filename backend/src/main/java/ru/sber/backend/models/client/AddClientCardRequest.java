package ru.sber.backend.models.client;


import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;


@Data
@AllArgsConstructor
public class AddClientCardRequest {

    private String clientCardNumber;

    private int clientCardCvc;

    private LocalDate clientCardExpirationDate;

    private String clientCardOwner;

}
