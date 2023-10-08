package ru.sber.backend.services;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.sber.backend.repositories.ClientRepository;

import java.util.Date;
import java.util.Optional;

/**
 * Сервис для взаимодействия с пользователем
 */
@Service
public class ClientServiceImpl implements ClientService {
    private final ClientRepository clientRepository;
    private final CartService cartService;

    @Autowired
    public ClientServiceImpl(ClientRepository clientRepository, CartService cartService) {
        this.clientRepository = clientRepository;
        this.cartService = cartService;
    }

    @Override
    public long signUp(User client) {
        return clientRepository.save(client).getId();
    }

    @Override
    public Optional<User> getClientById(long clientId) {
        return clientRepository.findById(clientId);
    }

    @Override
    public boolean checkClientExistence(long clientId) {
        return clientRepository.existsById(clientId);
    }

    @Override
    @Transactional
    public boolean deleteClientById(long clientId) {
        if (checkClientExistence(clientId)) {
            cartService.clearCart(clientId);
            clientRepository.deleteById(clientId);
            return true;
        }
        return false;
    }

    @Override
    public Optional<User> getClientByEmail(String email) {
        return clientRepository.findUserByEmail(email);
    }

    @Override
    public boolean updateClientInfo(long clientId, String name, Date dateOfBirth, String number) {
        Optional<User> optionalUser = clientRepository.findById(clientId);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            user.setUsername(name);
            user.setDateOfBirth(dateOfBirth);
            user.setNumber(number);

            clientRepository.save(user);

            return true;
        } else {
            throw new EntityNotFoundException("Клиент с id " + clientId + " не найден");
        }
    }
}
