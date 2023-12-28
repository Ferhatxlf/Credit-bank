package com.bank.credit.credit_bank_server.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
@Slf4j
@Controller
public class Routes {
  @GetMapping(path="/")
  public String index(ModelMap model){
    log.info("serving index");
    return "index";
  }

  @GetMapping(path = "/error")
  public String errorPage(ModelMap model){
    return "error";
  }
}
