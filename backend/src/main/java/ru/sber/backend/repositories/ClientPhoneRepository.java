package ru.sber.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.sber.backend.entities.ClientPhone;

import java.util.List;

/**
 * Репозиторий для взаимодействия с номерами клиента
 */
@Repository
public interface ClientPhoneRepository extends JpaRepository<ClientPhone, Long> {

        List<ClientPhone> findAllClientPhonesByIdClient(String clientId);

        boolean existsByPhone(String phone);



}
