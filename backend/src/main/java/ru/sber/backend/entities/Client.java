package ru.sber.backend.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Table(name = "clients")
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @Size(max = 20)
    private String clientLogin;

    @Column(nullable = false)
    @Size(max = 50)
    @Email
    private String clientEmail;

    @Column(nullable = false)
    @Size(max = 120)
    private String clientPassword;

    @Column
    private String clientSex;

    @Temporal(TemporalType.DATE)
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date clientDateOfBirth;

    @Column(nullable = false)
    @Size(max = 20)
    private String ClientName;
}
