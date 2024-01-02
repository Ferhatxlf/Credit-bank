package com.bank.credit.credit_bank_server.entity.product;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ProposedProduct {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private int value;
  private Boolean enabled;
  @Enumerated(value = EnumType.ORDINAL)
  private ProductType type;

}
