package ru.sber.backend.controllers.product;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ru.sber.backend.entities.product.Product;
import ru.sber.backend.exceptions.ProductNotFound;
import ru.sber.backend.models.product.GetProductResponse;
import ru.sber.backend.services.product.ProductService;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    /**
     * Получает продукт пользователя по артиклю
     *
     * @return продукт по артиклю
     */
    @GetMapping("/{productArticle}")
    public ResponseEntity<GetProductResponse> getProductByArticle(@PathVariable int productArticle) {
        try {
            log.info("Получение продукта по артиклю");
            GetProductResponse productByArticle = productService.getProductByArticle(productArticle);
            log.info("продукт по артиклю: {}", productByArticle);
            //сценарий проработать на фронте, когда null вернется
            return ResponseEntity.ok()
                    .body(productByArticle);
        } catch (ProductNotFound productNotFound) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Получает нужную страницу продуктов с заданным размером
     *
     * @return список продуктов
     */
    @GetMapping
    public ResponseEntity<List<GetProductResponse>> getListProduct(@RequestParam int page, @RequestParam int size, @RequestParam String category) {
        log.info("Получение страницы продуктов");
        Page<GetProductResponse> listProduct = productService.getListProduct(page, size, category);
        log.info("Суммарное кол-во страниц: {}", listProduct.getTotalPages());
        HttpHeaders headers = new HttpHeaders();
        headers.add("x-total-pages", String.valueOf(listProduct.getTotalPages()));
        return ResponseEntity.ok()
                .headers(headers)
                .body(listProduct.getContent());
    }
}
