package com.bank.credit.credit_bank_server.entity.demande;

import com.bank.credit.credit_bank_server.entity.action.Action;
import com.bank.credit.credit_bank_server.entity.credit.CreditType;
import com.bank.credit.credit_bank_server.entity.credit.FinancingMethod;
import com.bank.credit.credit_bank_server.entity.file.UploadedFile;
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
  private Long userId;
  private Long creditTypeId;

  @ManyToOne
  @MapsId("userId")
  @JoinColumn(name = "userId")
  private User user;

  @OneToMany(mappedBy = "demande", cascade = CascadeType.ALL)
  private List<UploadedFile> files;

  @OneToMany(mappedBy = "demande", cascade = CascadeType.ALL)
  private List<Action> actions;

  @ManyToOne
  @MapsId("creditTypeId")
  @JoinColumn(name="creditTypeId")
  private CreditType type;

  @ManyToOne
  @MapsId("financingMethodId")
  @JoinColumn(name="financingMethodId")
  private FinancingMethod financingMethod;
}
