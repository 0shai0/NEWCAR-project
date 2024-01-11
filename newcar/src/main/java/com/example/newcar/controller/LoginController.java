package com.example.newcar.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.newcar.model.Account;
import com.example.newcar.repository.AccountRepository;

@RestController
@CrossOrigin(origins = "*")
public class LoginController {
    @Autowired
    AccountRepository accountRepository;

    @PostMapping("/api/login")
    public List<Account> loginMember(
        @RequestParam("userId") String userId,
        @RequestParam("userPw") String userPw
    ) {
        List<Account> userInfo = accountRepository.findByUserId(userId);

        if (userInfo.size() > 0) {
            return userInfo;
        }
        else {
            return null;
        }
    }
}
