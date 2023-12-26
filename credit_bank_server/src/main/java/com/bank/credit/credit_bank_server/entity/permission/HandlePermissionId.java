package com.bank.credit.credit_bank_server.entity.permission;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HandlePermissionId implements Serializable {

  private Long userId;
  private Long demandeId;
  private Long roleId;

  @Override
  public boolean equals(Object o){
    if(o == null) return false;
    if(o.getClass()!= getClass()) return false;
    HandlePermissionId obj = (HandlePermissionId) o;
    return obj.getRoleId() == roleId && obj.getUserId() == userId && obj.getDemandeId() == demandeId;
  }

  @Override
  public int hashCode() {
    return Objects.hash(userId, roleId, demandeId);
  }

}
