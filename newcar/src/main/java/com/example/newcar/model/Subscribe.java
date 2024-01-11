package com.example.newcar.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Subscribe {
    @Id
    private String kind;
    
    private int price;
}
