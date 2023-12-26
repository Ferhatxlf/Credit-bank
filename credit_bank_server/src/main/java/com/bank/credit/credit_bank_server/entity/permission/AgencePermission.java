package com.bank.credit.credit_bank_server.entity.permission;

import com.bank.credit.credit_bank_server.entity.agence.Agence;
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
public class AgencePermission {

  @EmbeddedId
  private AgencePermissionId id;

  private boolean enabled;
  private Date creation;

  @ManyToOne
  @MapsId("agenceId")
  @JoinColumn(name = "agenceId")
  private Agence agence;

  @ManyToOne
  @MapsId("userId")
  @JoinColumn(name = "userId")
  private User user;

}
