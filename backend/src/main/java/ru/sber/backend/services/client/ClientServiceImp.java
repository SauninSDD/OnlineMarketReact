package ru.sber.backend.services.client;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import ru.sber.backend.services.JwtService;

@Service
@Slf4j
public class ClientServiceImp implements ClientService {

    private final JwtService jwtService;

    @Autowired
    public ClientServiceImp(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    public String getIdClient() {
        Jwt jwt = jwtService.getJwtSecurityContext();
//        Long clientId = Long.parseLong(jwtService.getSubClaim(jwt));
//        log.info("Парс id клиента к виду: {}", clientId);
        return jwtService.getSubClaim(jwt);
    }

}
