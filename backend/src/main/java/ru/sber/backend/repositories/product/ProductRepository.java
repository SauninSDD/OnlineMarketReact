package ru.sber.backend.repositories.product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.sber.backend.entities.product.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    Product findByProductArticle(int articleProduct);


    Page<Product> findByCategoryCategoryName(String category, PageRequest of);
}
