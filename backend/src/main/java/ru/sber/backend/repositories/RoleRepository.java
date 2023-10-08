package ru.sber.backend.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

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
