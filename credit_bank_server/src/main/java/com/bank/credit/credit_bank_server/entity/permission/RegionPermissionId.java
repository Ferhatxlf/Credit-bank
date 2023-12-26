package com.bank.credit.credit_bank_server.entity.permission;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Data
public class RegionPermissionId implements Serializable {
  private Long regionId;
  private Long userId;
  private Long roleId;

  @Override
  public boolean equals(Object o){
    if(o == null) return false;
    if(o.getClass()!= getClass()) return false;
    RegionPermissionId obj = (RegionPermissionId) o;
    return obj.getRoleId() == roleId && obj.getUserId() == userId && obj.getRegionId()==regionId;
  }

  @Override
  public int hashCode(){
    return Objects.hash(roleId,userId,regionId);
  }
}
