package ru.sber.backend.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.sber.backend.entities.Role;
import ru.sber.backend.entities.enums.ERole;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    /**
     * Получает роль по названию
     *
     * @param name название роли
     * @return найденная роль
     */
    Optional<Role> findByName(ERole name);
}
