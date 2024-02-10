package ru.sber.backend.services.product;


import ru.sber.backend.entities.ProductCategory;
import ru.sber.backend.models.product.AddProductCategoryRequest;

import java.util.List;

//подумать над логикой обновления, добавления новых категорий, объединить мб дто для добавления и обновления
//и пока не пон как работает вундервафля с подкатегориями)
public interface ProductCategoryService {
    List<ProductCategory> getAllCategories();

    ProductCategory getCategory(Long productCategoryId);

    List<ProductCategory> getSubCategories(Long productCategoryId);

    boolean addProductCategory(AddProductCategoryRequest addProductCategoryRequest);

    boolean updateProductCategory();
}
