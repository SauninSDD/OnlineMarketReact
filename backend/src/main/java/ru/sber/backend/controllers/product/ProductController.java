package ru.sber.backend.controllers.product;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.data.domain.Page;
import org.springframework.http.*;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import ru.sber.backend.exceptions.ProductNotFound;
import ru.sber.backend.exceptions.TranslateError;
import ru.sber.backend.models.product.*;
import ru.sber.backend.services.product.ProductService;

import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;
import java.util.stream.Stream;

@Slf4j
@RestController
@RequestMapping("/products")
public class ProductController {
    private final CacheManager cacheManager;
    private final ProductService productService;

    @Autowired
    public ProductController(CacheManager cacheManager, ProductService productService) {
        this.cacheManager = cacheManager;
        this.productService = productService;
    }

    /**
     * Получает продукт по артиклю
     *
     * @return продукт по артиклю
     */
    @GetMapping("/searchByArticle/{productArticle}")
    public ResponseEntity<GetProductResponse> getProductByArticle(@PathVariable int productArticle) {
        try {
            log.info("Получение продукта по артиклю");
            GetProductResponse productByArticle = productService.getProductByArticle(productArticle);
            log.info("продукт по артиклю: {}", productByArticle);
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
    @GetMapping("/searchByCategory")
    public ResponseEntity<List<GetProductResponse>> getListProduct(@RequestParam int page, @RequestParam int size, @RequestParam String category, @RequestParam String language) {
        Page<GetProductResponse> listProduct = productService.getProductsByCategory(page, size, category);
        HttpHeaders headers = new HttpHeaders();
        headers.add("x-total-pages", String.valueOf(listProduct.getTotalPages()));
        List<GetProductResponse> body = listProduct.getContent();
        if (language.equals("en") && !body.isEmpty()) {
            body = translateProducts(body);
            log.info("Переводы: {}", body);
        }
        return ResponseEntity.ok()
                .headers(headers)
                .body(body);
    }

    /**
     * Получает список продуктов по названию
     *
     * @return список продуктов с подходящим названием
     */
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

    /**
     * Получает список продуктов по интервалу цены и категории
     *
     * @return список продуктов
     */
    @GetMapping("/searchByPriceRangeAndCategory")
    public ResponseEntity<List<GetProductResponse>> getProductByPriceRangeAndCategory(@RequestParam int page, @RequestParam int size, @RequestParam BigDecimal minPrice, @RequestParam BigDecimal maxPrice, @RequestParam String category) {
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

    /**
     * Получает список продуктов по интервалу цены
     *
     * @return список продуктов
     */
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

    @Cacheable("translationCache")
    public List<GetProductResponse> translateProducts(List<GetProductResponse> productsForTranslate) {
        List<String> listOfNames = productsForTranslate.stream().map(GetProductResponse::getProductName).toList();
        List<String> listOfDescriptions = productsForTranslate.stream().map(GetProductResponse::getProductDescription).toList();
        List<String> listForTranslate = Stream.concat(listOfNames.stream(), listOfDescriptions.stream())
                .toList();

        log.info("Массив для перевода {}", listForTranslate);

        String urlTranslate = "https://translate.api.cloud.yandex.net/translate/v2/translate";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        try {
            headers.add("Authorization", "Bearer " + getTranslateToken());
            HttpEntity<TranslateRequest> translateEntity = new HttpEntity<>(new TranslateRequest(listForTranslate), headers);

            ResponseEntity<TranslateResponse> responseTranslate = new RestTemplate().exchange(
                    urlTranslate,
                    HttpMethod.POST,
                    translateEntity,
                    new ParameterizedTypeReference<>() {
                    }
            );

            TranslateResponse translateResponse = responseTranslate.getBody();
            log.info("translateResponse {}", translateResponse);
            List<String> translates= Objects.requireNonNull(translateResponse).getTranslations().stream().map(TranslateResponseAttributes::getText).toList();
            for (int i = 0; i < productsForTranslate.size(); i++) {
                int translateIndex = i * 2;
                productsForTranslate.get(i).setProductName(translates.get(translateIndex));
                productsForTranslate.get(i).setProductDescription(translates.get(translateIndex + 1));
            }
            return productsForTranslate;


        } catch (Exception e) {
            e.printStackTrace();
            throw new TranslateError("Перевод завершился ошибкой");
        }
    }

    @Cacheable(value = "tokenCache", key = "'token'")
    public String getTranslateToken() {
        String urlTokenTranslate = "https://iam.api.cloud.yandex.net/iam/v1/tokens";
        HttpEntity<TranslateTokenRequest> translateTokenEntity = new HttpEntity<>(new TranslateTokenRequest());

        try {
            ResponseEntity<TranslateTokenResponse> responseTranslateToken = new RestTemplate().exchange(
                    urlTokenTranslate,
                    HttpMethod.POST,
                    translateTokenEntity,
                    new ParameterizedTypeReference<>() {
                    }
            );

            log.info("responseTranslateToken: {}", responseTranslateToken);
            return Objects.requireNonNull(responseTranslateToken.getBody()).getIamToken();
        } catch (Exception e) {
            e.printStackTrace();
            throw new TranslateError("Получение токена завершилось ошибкой");
        }
    }

    @Scheduled(fixedRate = 6 * 60 * 60 * 1000) // 6 часов в миллисекундах
    public void evictTokenCache() {
        log.info("Чистим кеш функции получения токена");
        Cache cache = cacheManager.getCache("tokenCache");
        if (cache != null) {
            cache.evict("token");
        }
    }
}
