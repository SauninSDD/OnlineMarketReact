package ru.sber.backend.services.product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import ru.sber.backend.entities.product.Product;
import ru.sber.backend.exceptions.ProductNotFound;
import ru.sber.backend.models.product.GetProductResponse;
import ru.sber.backend.repositories.product.ProductRepository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;

@Service
public class ProductServiceImp implements ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductServiceImp(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public Optional<Product> getProductById(Long productId) {
        return productRepository.findById(productId);
    }

    @Override
    public GetProductResponse getProductByArticle(int productArticle) {
        Product product = productRepository.findByProductArticle(productArticle);
        if (product == null) {
            throw new ProductNotFound("Продукт не найден");
        } else {
            return new GetProductResponse(product);
        }
    }


    @Override
    public Page<GetProductResponse> getListProduct(int page, int size, String category) {
        Page<Product> productsPage;
        if (category != null && !category.isEmpty()) {
            productsPage = productRepository.findByCategoryCategoryName(category, PageRequest.of(page, size));
        } else {
            productsPage = productRepository.findAll(PageRequest.of(page, size));
        }
        return productsPage.map(getGetProductResponseFunction());
    }


    @Override
    public List<Product> getProductsByName(String productName) {
        return null;
    }

    @Override
    public List<Product> getProductsByCategory(String categoryName) {
        return null;
    }

    @Override
    public List<Product> getProductsByPriceRange(BigDecimal minPrice, BigDecimal maxPrice) {
        return null;
    }

    @Override
    public List<Product> getProductsByPriceMin(BigDecimal minPrice) {
        return null;
    }

    @Override
    public List<Product> getProductsByPriceMax(BigDecimal maxPrice) {
        return null;
    }

    @Override
    public List<Product> getAllProducts() {
        return null;
    }

    @Override
    public boolean addProduct(Product product) {
        return false;
    }

    @Override
    public boolean updateProduct(Product product) {
        return false;
    }

    @Override
    public boolean deleteProduct(Long productId) {
        return false;
    }

    /**
     * Преобразует класс Product {@link Product} в {@link GetProductResponse}
     *
     * @return GetProductResponse
     */
    private Function<Product, GetProductResponse> getGetProductResponseFunction() {
        return GetProductResponse::new;
    }


}
