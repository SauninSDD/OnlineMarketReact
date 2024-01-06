package ru.sber.backend.models;

import lombok.Data;

@Data
public class UpdateResponse {
    String email;
    Attributes attributes;
}
