package com.bank.credit.credit_bank_server.entity.demande;

import com.bank.credit.credit_bank_server.entity.credit.CreditType;
import com.bank.credit.credit_bank_server.entity.credit.FinancingMethod;
import com.bank.credit.credit_bank_server.entity.file.UplodedFile;
import com.bank.credit.credit_bank_server.entity.user.RoleUser;
import com.bank.credit.credit_bank_server.entity.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Demande {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private Long financingMethodId;

  @ManyToOne
  @JoinColumn(name = "userid")
  private User user;

  @OneToMany(mappedBy = "demande", cascade = CascadeType.ALL)
  private List<UplodedFile> files;

  @OneToOne
  @JoinColumn(name="creditTypeId")
  private CreditType creditType;

  @ManyToOne
  @MapsId("financingMethodId")
  @JoinColumn(name="financingMethodId")
  private FinancingMethod financingMethod;
}
