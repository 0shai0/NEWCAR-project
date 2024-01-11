package com.example.newcar.controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.newcar.model.Account;
import com.example.newcar.repository.AccountRepository;

@RestController
public class SubscribeController {
    @Autowired
    AccountRepository accountRepository;

    @PutMapping("/api/subscribe/{sessionId}")
    public String subscribe(
        @PathVariable String sessionId,
        @RequestParam("kind") String kind
    ) {
        Account userInfo = accountRepository.findByUserId(sessionId).get(0);
        userInfo.getKind().setKind(kind);
        userInfo.setSubscribeStart(LocalDateTime.now());
        userInfo.setDays(30);
        accountRepository.save(userInfo);

        return "신청되었습니다";
    }
}
