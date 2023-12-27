package com.bank.credit.credit_bank_server.controller;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(path="/api/v1/test")
public class ApiTest {

  @RequestMapping(path = "/test1", method = RequestMethod.GET)
  public Map test1(@RequestParam(defaultValue = "test") String testString, @RequestParam(defaultValue = "1") int testNumber){
    Map result = new HashMap();
    result.put("message", testString+testNumber);
    return result;
  }
}
