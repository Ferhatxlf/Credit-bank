package com.bank.credit.credit_bank_server.entity.permission;

import com.bank.credit.credit_bank_server.entity.agence.Agence;
import com.bank.credit.credit_bank_server.entity.demande.Demande;
import com.bank.credit.credit_bank_server.entity.user.Role;
import com.bank.credit.credit_bank_server.entity.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class HandlePermission {
  @EmbeddedId
  private HandlePermissionId id;

  private boolean enabled;
  private Date creation;

  @ManyToOne
  @MapsId("demandeId")
  @JoinColumn(name = "demandeId")
  private Demande demande;

  @ManyToOne
  @MapsId("userId")
  @JoinColumn(name = "userId")
  private User user;

  @ManyToOne
  @MapsId("roleId")
  @JoinColumn(name = "roleId")
  private Role role;
}
