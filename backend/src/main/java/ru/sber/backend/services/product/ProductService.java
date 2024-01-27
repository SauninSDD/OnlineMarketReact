package ru.sber.backend.services.product;

import ru.sber.backend.entities.Product;

import java.math.BigDecimal;
import java.util.List;

public interface ProductService {
    Product getProductById(Long productId);

    Product getProductByArticle(Long productId);

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
