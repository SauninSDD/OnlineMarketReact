package ru.sber.backend.controllers.product;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.sber.backend.services.product.ProductCategoryService;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/categories")
public class ProductCategoryController {

    private final ProductCategoryService productCategoryService;

    @Autowired
    public ProductCategoryController( ProductCategoryService productCategoryService) {
        this.productCategoryService = productCategoryService;
    }

    /**
     * Получает катгории (без парент id)
     *
     * @return List<String>
     */
    @GetMapping("/getCategories")
    public ResponseEntity<List<String>> getCategories() {
        log.info("Получение категорий");
        List<String> categories = productCategoryService.getCategories();
        log.info("список категорий: {}", categories);
        return ResponseEntity.ok()
                .body(categories);
    }

    /**
     * Получает список подкатгорий (без вложенных подкатегорий) по categoryId
     *
     * @return List<String>
     */
    @GetMapping("/getSubCategories")
    public ResponseEntity<List<String>> getSubCategories(@RequestParam Long categoryId) {
        log.info("Получение подкатегорий по categoryId");
        List<String> subCategories = productCategoryService.getSubCategories(categoryId);
        log.info("список подкатегорий: {}", subCategories);
        return ResponseEntity.ok()
                .body(subCategories);
    }

    /**
     * Получает список вложенных подкатгорий по categoryId
     *
     * @return List<String>
     */
    @GetMapping("/getNestedSubCategories")
    public ResponseEntity<List<String>> getNestedSubCategories(@RequestParam Long categoryId) {
            log.info("Получение подкатегорий (рекурсия) по categoryId");
            List<String> subCategories = productCategoryService.getNestedSubCategories(categoryId);
            log.info("список подкатегорий: {}", subCategories);
            return ResponseEntity.ok()
                    .body(subCategories);
        }
/*

    */
/**
     * Получает нужную страницу продуктов с заданным размером
     *
     * @return список продуктов
     *//*

    @GetMapping("/searchByCategory")
    public ResponseEntity<List<GetProductResponse>> getListProduct(@RequestParam int page, @RequestParam int size, @RequestParam String category) {
        log.info("Получение страницы продуктов");
        Page<GetProductResponse> listProduct = productService.getProductsByCategory(page, size, category);
        log.info("Суммарное кол-во страниц: {}", listProduct.getTotalPages());
        HttpHeaders headers = new HttpHeaders();
        headers.add("x-total-pages", String.valueOf(listProduct.getTotalPages()));
        return ResponseEntity.ok()
                .headers(headers)
                .body(listProduct.getContent());
    }

    */
/**
     * Получает список продуктов по названию
     *
     * @return список продуктов с подходящим названием
     *//*

    @GetMapping("/searchByName")
    public ResponseEntity<List<GetProductResponse>> getProductByName(@RequestParam int page, @RequestParam int size, @RequestParam String name) {
            log.info("Получение продуктов по названию");
            Page<GetProductResponse> productsByName = productService.getProductsByName(page, size, name);
            log.info("продукты по названию: {}", productsByName);
            log.info("Суммарное кол-во страниц: {}", productsByName.getTotalPages());
            HttpHeaders headers = new HttpHeaders();
            headers.add("x-total-pages", String.valueOf(productsByName.getTotalPages()));
            return ResponseEntity.ok()
                    .headers(headers)
                    .body(productsByName.getContent());
    }

    */
/**
     * Получает список продуктов по интервалу цены и категории
     *
     * @return список продуктов
     *//*

    @GetMapping("/searchByPriceRangeAndCategory")
    public ResponseEntity<List<GetProductResponse>> getProductByPriceRangeAndCategory(@RequestParam int page, @RequestParam int size, @RequestParam BigDecimal minPrice, @RequestParam BigDecimal maxPrice,  @RequestParam String category) {
        log.info("Получение продуктов по интервалу цены и категории");
        Page<GetProductResponse> productsByPriceRangeAndCategory = productService.getProductsByPriceRangeAndCategory(page, size, minPrice, maxPrice, category);
        log.info("продукты  по интервалу цены и категории: {}", productsByPriceRangeAndCategory);
        log.info("Суммарное кол-во страниц: {}", productsByPriceRangeAndCategory.getTotalPages());
        HttpHeaders headers = new HttpHeaders();
        headers.add("x-total-pages", String.valueOf(productsByPriceRangeAndCategory.getTotalPages()));
        return ResponseEntity.ok()
                .headers(headers)
                .body(productsByPriceRangeAndCategory.getContent());
    }

    */
/**
     * Получает список продуктов по интервалу цены
     *
     * @return список продуктов
     *//*

    @GetMapping("/searchByPriceRange")
    public ResponseEntity<List<GetProductResponse>> getProductByPriceRangeAndCategory(@RequestParam int page, @RequestParam int size, @RequestParam BigDecimal minPrice, @RequestParam BigDecimal maxPrice) {
        log.info("Получение продуктов по интервалу цены");
        Page<GetProductResponse> productsByPriceRange = productService.getProductsByPriceRange(page, size, minPrice, maxPrice);
        log.info("продукты по интервалу цены: {}", productsByPriceRange);
        log.info("Суммарное кол-во страниц: {}", productsByPriceRange.getTotalPages());
        HttpHeaders headers = new HttpHeaders();
        headers.add("x-total-pages", String.valueOf(productsByPriceRange.getTotalPages()));
        return ResponseEntity.ok()
                .headers(headers)
                .body(productsByPriceRange.getContent());
    }
    */
}

