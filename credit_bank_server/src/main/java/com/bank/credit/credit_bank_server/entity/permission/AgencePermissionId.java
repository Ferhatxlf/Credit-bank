package com.bank.credit.credit_bank_server.entity.permission;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AgencePermissionId implements Serializable {
  private Long agenceId;
  private Long userId;
  private Long roleId;

  @Override
  public boolean equals(Object o){
    if(o==null) return false;
    if(o.getClass() !=this.getClass()) return false;
    AgencePermissionId obj = (AgencePermissionId) o;
    return obj.getAgenceId() == agenceId && obj.getRoleId() == roleId && obj.getUserId() == userId;
  }

  @Override
  public int hashCode() {
    return Objects.hash(userId, roleId, agenceId);
  }

}
