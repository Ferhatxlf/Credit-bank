package com.bank.credit.credit_bank_server.entity.credit;

import com.bank.credit.credit_bank_server.entity.demande.Demande;
import com.bank.credit.credit_bank_server.entity.file.FileType;
import com.bank.credit.credit_bank_server.entity.simulation.Simulation;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class CreditType {
  @Id
  @GeneratedValue (strategy = GenerationType.IDENTITY)
  private Long id;

  private String description;
  private Long categoryId;

  @OneToMany(mappedBy = "creditType", cascade = CascadeType.ALL)
  private List<RequiredFiles> requiredFiles;

  @ManyToOne
  @MapsId("categoryId")
  @JoinColumn(name="categoryId")
  private CreditCategory category;

  @OneToMany(mappedBy = "type", cascade = CascadeType.ALL)
  private List<Demande> demandes;

  @OneToMany(mappedBy = "type", cascade = CascadeType.ALL)
  private List<Simulation> simulations;
}
