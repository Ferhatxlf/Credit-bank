package com.bank.credit.credit_bank_server.entity.income;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Income {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
}
