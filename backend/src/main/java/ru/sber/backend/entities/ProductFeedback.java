package ru.sber.backend.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Embeddable
@Table(name = "products_feedbacks")
@Data
@NoArgsConstructor
public class ProductFeedback {
    @Id
    @Column(name = "id_product_feedback")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_client")
    private Client client;

    @ManyToOne
    @JoinColumn(name = "id_product")
    private Product product;

    @Column(nullable = false)
    private byte productFeedbackScore;

    @Column
    private String productFeedbackReview;


}
