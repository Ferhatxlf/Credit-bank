package com.bank.credit.credit_bank_server.entity.credit;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class CreditCategory {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String designation;
  private String description;

  @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
  private List<CreditType> creditTypes;
}
