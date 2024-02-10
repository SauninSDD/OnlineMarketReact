package ru.sber.backend.services.product;

import ru.sber.backend.entities.ProductFeedback;
import ru.sber.backend.models.product.AddProductFeedbackRequest;

import java.util.List;

public interface ProductFeedbackService {
    List<ProductFeedback> getProductFeedbacksByClientId();

    boolean addProductFeedback(AddProductFeedbackRequest addProductFeedbackRequest);

    boolean deleteProductFeedback(Long productFeedbackId);
}
