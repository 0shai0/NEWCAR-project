package com.example.newcar.controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.newcar.model.Account;
import com.example.newcar.repository.AccountRepository;
import com.example.newcar.repository.SubscribeRepository;

@RestController
@CrossOrigin(origins = "http://10.10.21.66:3000")
public class SubscribeController {
    @Autowired
    AccountRepository accountRepository;
    @Autowired
    SubscribeRepository subscribeRepository;

    @PutMapping("/api/subscribe/{sessionId}")
    public String subscribe(
        @PathVariable String sessionId,
        @RequestParam("kind") String kind
    ) {
        if (accountRepository.findByUserId(sessionId).get(0).getDays() > 0) {
            return "이미 구독 신청이 되어있습니다";
        }
        else {
            Account userInfo = accountRepository.findByUserId(sessionId).get(0);
            userInfo.setKind(subscribeRepository.findByKind(kind).get(0));
            userInfo.setSubscribeStart(LocalDateTime.now());
            userInfo.setDays(30);
            accountRepository.save(userInfo);

            return "구독 신청 완료";
        }
    }
}
