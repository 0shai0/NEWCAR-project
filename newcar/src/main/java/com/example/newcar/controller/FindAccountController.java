package com.example.newcar.controller;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.newcar.model.Account;
import com.example.newcar.repository.AccountRepository;

@RestController
@CrossOrigin(origins = "http://10.10.21.66:3000")
public class FindAccountController {
    @Autowired
    AccountRepository accountRepository;

    @PostMapping("/api/findId")
    public List<Account> findId(
        @RequestParam("phoneNumber") String phoneNumber
    ) {
        List<Account> userInfo = accountRepository.findByPhoneNumber(phoneNumber);
	List<String> idInfo = new ArrayList<>();

        for (int i = 0; i < userInfo.size(); i++) {
            idInfo.add(userInfo.get(i).getUserId());
        }
        
        return userInfo.isEmpty() ? Collections.emptyList() : userInfo;
    }

    @PostMapping("/api/findPw")
    public List<Account> findPw(
        @RequestParam("userId") String userId,
        @RequestParam("phoneNumber") String phoneNumber
    ) {
        List<Account> id = accountRepository.findByUserId(userId);
        List<Account> newInfo = new ArrayList<>();

        if (id.isEmpty()) {
            return newInfo;
        }
        else {
            if (id.get(0).getPhoneNumber().equals(phoneNumber)) {
                resetId = userId;

                return id;
            }
            else {
                return newInfo;
            }
        }
    }

    @PutMapping("/api/resetPw")
    public String resetPw(
        @RequestParam("userId") String userId,
        @RequestParam("userPw") String userPw
    ){
        Account userInfo = accountRepository.findByUserId(userId).get(0);

        userInfo.setUserPw(userPw);
        accountRepository.save(userInfo);

        return "비밀번호 재설정 성공";
    }
}
