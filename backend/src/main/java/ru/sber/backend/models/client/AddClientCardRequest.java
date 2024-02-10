package ru.sber.backend.models.client;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDate;

@Data
public class AddClientCardRequest {

    private String clientCardNumber;

    private int clientCardCvc;

    @JsonFormat(pattern = "dd.MM.yyyy")
    private LocalDate clientCardExpirationDate;

    private String clientCardOwner;

}
