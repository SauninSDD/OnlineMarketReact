package ru.sber.backend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class Attributes {
    private String phoneNumber;
    private String birthdate;
    private String gender;
}