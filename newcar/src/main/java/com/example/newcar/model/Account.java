package com.example.newcar.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class Account {
    @Id
    private String userId;

    private String userPw;
    private String nickName;
    private String phoneNumber;

    @ManyToOne
    @JoinColumn(name = "kind")
    private Subscribe kind;

    private LocalDateTime subscribeStart;
    private int days;
}
