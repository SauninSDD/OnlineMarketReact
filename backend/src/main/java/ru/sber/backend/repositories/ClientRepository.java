package ru.sber.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.sber.backend.entities.Client;
import java.util.Optional;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {
    Optional<Client> findUserByEmailAndPassword(String email, String password);

    Optional<Client> findByClientLogin(String clientLogin);

    Optional<Client> findClientByEmail(String email);

    Boolean existsByEmail(String email);
}
