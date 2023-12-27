package com.bank.credit.credit_bank_server.entity.commune;

import com.bank.credit.credit_bank_server.entity.agence.Agence;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Commune {
  @Id
  private Long id;

  private String name;
  private int postalCode;
  private long agenceId;

  @ManyToOne
  @MapsId("agenceId")
  @JoinColumn(name="agenceId")
  private Agence agence;
}
