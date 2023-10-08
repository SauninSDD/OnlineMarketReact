package ru.sber.backend.entities.response;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class JwtResponse {
    private String accessToken;

    private String type = "Bearer";

    private Long id;

    private String username;

    private String number;

    private Date dateOfBirth;

    private String email;

    private List<String> roles;

    public JwtResponse(String accessToken, Long id, String username, String number, Date dateOfBirth, String email, List<String> roles) {
        this.accessToken = accessToken;

        this.id = id;

        this.username = username;

        this.number = number;

        this.dateOfBirth = dateOfBirth;

        this.email = email;

        this.roles = roles;
    }
}
