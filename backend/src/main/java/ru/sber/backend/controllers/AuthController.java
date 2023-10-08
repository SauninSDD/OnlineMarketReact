package ru.sber.backend.controllers;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ru.sber.backend.entities.request.LoginRequest;
import ru.sber.backend.entities.request.SignupRequest;
import ru.sber.backend.entities.response.JwtResponse;
import ru.sber.backend.entities.response.MessageResponse;
import ru.sber.backend.repositories.CartRepository;
import ru.sber.backend.repositories.ClientRepository;
import ru.sber.backend.repositories.RoleRepository;
import ru.sber.backend.security.jwt.JwtUtils;
import ru.sber.backend.security.services.UserDetailsImpl;


import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Контроллер для аутентификации и регистрации пользователей.
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final ClientRepository userRepository;
    private final CartRepository cartRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder encoder;
    private final JwtUtils jwtUtils;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, ClientRepository userRepository,
                          CartRepository cartRepository, RoleRepository roleRepository, PasswordEncoder encoder, JwtUtils jwtUtils) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.cartRepository = cartRepository;
        this.roleRepository = roleRepository;
        this.encoder = encoder;
        this.jwtUtils = jwtUtils;
    }

    /**
     * Метод для аутентификации пользователя.
     *
     * @param loginRequest Объект с данными для аутентификации
     * @return Возвращает ответ с токеном аутентификации и ролями пользователя
     */
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        UsernamePasswordAuthenticationToken authenticationToken
                = new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword());

        Authentication authentication = authenticationManager.authenticate(authenticationToken);

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        JwtResponse body = new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(), userDetails.getNumber(), userDetails.getDateOfBirth(), userDetails.getEmail(), roles);

        return ResponseEntity
                .ok(body);
    }

    /**
     * Метод для регистрации нового пользователя.
     *
     * @param signUpRequest объект с данными для регистрации
     * @return Возвращает ответ об успешной регистрации или об ошибке
     */
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Email уже используется"));
        }

        User user = new User(
                signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                signUpRequest.getNumber(),
                signUpRequest.getDateOfBirth(),
                encoder.encode(signUpRequest.getPassword()));

        Set<Role> roles = new HashSet<>();

        Role userRole = roleRepository.findByName(ERole.USER)
                .orElseThrow(() -> new RuntimeException("Роль не найдена"));
        roles.add(userRole);

        user.setRoles(roles);

        Cart cart = new Cart();
        cart.setClient(user);

        userRepository.save(user);
        cartRepository.save(cart);

        return ResponseEntity.ok(new MessageResponse("Клиент успешно зарегистрирован"));
    }

}
