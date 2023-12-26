package com.bank.credit.credit_bank_server.entity.user;

import jakarta.persistence.Embeddable;
import jakarta.persistence.EmbeddedId;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Getter
@Setter
public class RoleUserId implements Serializable {
  private Long userId;
  private Long roleId;

  @Override
  public boolean  equals(Object o){
    if(o == null)return false;
    if(o.getClass() != this.getClass()) return false;
    RoleUserId obj = (RoleUserId)o;
    return obj.getRoleId() == roleId && obj.getUserId() == userId;
  }

  @Override
  public int hashCode() {
    return Objects.hash(userId, roleId);
  }
}
