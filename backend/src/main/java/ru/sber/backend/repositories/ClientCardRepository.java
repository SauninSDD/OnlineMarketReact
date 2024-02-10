package ru.sber.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.sber.backend.entities.ClientCard;

import java.util.List;
import java.util.Optional;

public interface ClientCardRepository extends JpaRepository<ClientCard, Long> {

    List<ClientCard> findAllClientCardsByIdClient(String idClient);

    boolean existsByClientCardNumber(String clientCardNumber);

    Optional<ClientCard> findClientCardByClientCardNumberAndIdClient(String clientCardNumber, String idClient);

}