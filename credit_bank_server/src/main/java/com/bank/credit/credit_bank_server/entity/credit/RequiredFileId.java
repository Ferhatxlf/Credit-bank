package com.bank.credit.credit_bank_server.entity.credit;

import jakarta.persistence.Embeddable;
import jakarta.persistence.EmbeddedId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequiredFileId implements Serializable {
  private Long creditTypeId;
  private Long fileTypeId;

  @Override
  public boolean equals(Object o){
    if(o == null) return false;
    if(o.getClass()!= getClass()) return false;
    RequiredFileId obj = (RequiredFileId) o;
    return obj.getCreditTypeId() == creditTypeId && obj.getFileTypeId() == fileTypeId;
  }

  @Override
  public int hashCode(){
    return Objects.hash(fileTypeId, creditTypeId);
  }
}
