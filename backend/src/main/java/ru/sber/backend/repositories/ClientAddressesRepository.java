package ru.sber.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.sber.backend.entities.ClientAddresses;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClientAddressesRepository extends JpaRepository<ClientAddresses, Long> {
    List<ClientAddresses> findClientAddressesByClientId(long clientId);
}
