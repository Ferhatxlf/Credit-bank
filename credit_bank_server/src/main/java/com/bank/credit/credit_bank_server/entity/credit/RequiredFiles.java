package com.bank.credit.credit_bank_server.entity.credit;

import com.bank.credit.credit_bank_server.entity.file.FileType;
import com.bank.credit.credit_bank_server.entity.user.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class RequiredFiles {

  @EmbeddedId
  private RequiredFileId id;

  @ManyToOne
  @MapsId("creditTypeId")
  @JoinColumn(name = "creditTypeId")
  private CreditType creditType;

  @ManyToOne
  @MapsId("fileTypeId")
  @JoinColumn(name = "fileTypeId")
  private FileType fileType;
}
