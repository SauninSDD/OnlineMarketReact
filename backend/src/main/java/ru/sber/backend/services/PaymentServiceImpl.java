package ru.sber.backend.services;

import org.springframework.stereotype.Service;

/**
 * Сервис для обработки платежа
 */
@Service
public class PaymentServiceImpl implements PaymentService {
    @Override
    public boolean pay(Payment payment) {
        return false;
    }
}
