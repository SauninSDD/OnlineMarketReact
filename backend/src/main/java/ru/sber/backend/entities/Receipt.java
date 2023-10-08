package ru.sber.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "receipts")
public class Receipt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int receiptTotalValue;

    private int receiptCardNumber;

    private int idClient;

    private Date receiptDate;

    @OneToOne
    @JoinColumn(name = "id_order", nullable = false)
    @JsonIgnore
    private Order order;


}
