package com.slpp.slpp_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "bio_ids")
public class BioIdModel {

    @Id
    @Column(name = "code", nullable = false, unique = true, length = 20)
    private String code;

    @Column(name = "used", nullable = false)
    private Integer used;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Integer getUsed() {
        return used;
    }

    public void setUsed(Integer used) {
        this.used = used;
    }
}
