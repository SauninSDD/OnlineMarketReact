package ru.sber.backend.services;

import ru.sber.backend.entities.Receipt;

public interface ReceiptService {
    Long addReceipt(Receipt receipt);

    Receipt getReceiptByOrderId(Long idOrder);

    boolean deleteReceipt(Long id);
}
