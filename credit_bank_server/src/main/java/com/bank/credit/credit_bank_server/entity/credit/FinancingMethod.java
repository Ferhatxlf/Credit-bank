package com.bank.credit.credit_bank_server.entity.credit;

import com.bank.credit.credit_bank_server.entity.demande.Demande;
import com.bank.credit.credit_bank_server.entity.simulation.Simulation;
import com.bank.credit.credit_bank_server.entity.user.RoleUser;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class FinancingMethod {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String description;

  @OneToMany(mappedBy = "financingMethod", cascade = CascadeType.ALL)
  private List<Demande> demandes;

  @OneToMany(mappedBy = "financingMethod", cascade = CascadeType.ALL)
  private List<Simulation> simulations;
}
