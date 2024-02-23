package ru.sber.backend.services.product;

import org.springframework.data.domain.Page;
import ru.sber.backend.entities.product.Product;
import ru.sber.backend.models.product.GetProductResponse;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface ProductService {
    Optional<Product> getProductById(Long productId);

    GetProductResponse getProductByArticle(int productArticle);

    Page<GetProductResponse> getListProduct(int page, int size, String category);

    List<Product> getProductsByName(String productName);

    List<Product> getProductsByCategory(String categoryName);

    List<Product> getProductsByPriceRange(BigDecimal minPrice, BigDecimal maxPrice);

    List<Product> getProductsByPriceMin(BigDecimal minPrice);

    List<Product> getProductsByPriceMax(BigDecimal maxPrice);

    List<Product> getAllProducts();

    boolean addProduct(Product product);

    boolean updateProduct(Product product);

    boolean deleteProduct(Long productId);
}
