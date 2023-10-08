package ru.sber.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "products", uniqueConstraints = {@UniqueConstraint(columnNames = "productArticle")})
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private BigDecimal productPrice;

    @Column
    private String productDescription;

    @Column(nullable = false)
    private int productWeight;

    @Column(nullable = false)
    private int productWidth;

    @Column(nullable = false)
    private int productHeight;

    @Column(nullable = false)
    private int productLength;


    @Column(nullable = false)
    private int productArticle;

    @ManyToOne
    @JoinColumn(name = "id_measure", nullable = false)
    @JsonIgnore
    private Measure measure;

    @ManyToOne
    @JoinColumn(name = "id_category", nullable = false)
    @JsonIgnore
    private ProductCategory category;
}
