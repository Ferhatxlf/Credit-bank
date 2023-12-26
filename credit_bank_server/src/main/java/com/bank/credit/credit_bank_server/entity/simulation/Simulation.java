package com.bank.credit.credit_bank_server.entity.simulation;

import com.bank.credit.credit_bank_server.entity.credit.FinancingMethod;
import com.bank.credit.credit_bank_server.entity.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Simulation {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private Long financingMethodId;
  private Long userId;

  @ManyToOne
  @MapsId("financingMethodId")
  @JoinColumn(name="financingMethodId")
  private FinancingMethod financingMethod;

  @ManyToOne
  @MapsId("userId")
  @JoinColumn(name="userId")
  private User user;
}
