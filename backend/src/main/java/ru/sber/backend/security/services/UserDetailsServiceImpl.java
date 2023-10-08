package ru.sber.backend.security.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.sber.backend.repositories.ClientRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    ClientRepository clientRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = clientRepository.findUserByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Пользователь с логином : "
                        + email + " не найден"));

        return UserDetailsImpl.build(user);
    }
}
