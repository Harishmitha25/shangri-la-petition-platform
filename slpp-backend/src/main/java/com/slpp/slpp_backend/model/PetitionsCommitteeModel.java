package com.slpp.slpp_backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "petitions_committee")
public class PetitionsCommitteeModel {

    @Id
    @Column(nullable = false, length = 100)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name = "threshold", nullable = false, columnDefinition = "INT DEFAULT 100")
    private int threshold;

    public PetitionsCommitteeModel() {
    }

    public PetitionsCommitteeModel(String email, String password, int threshold) {
        this.email = email;
        this.password = password;
        this.threshold = threshold;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getThreshold() {
        return threshold;
    }

    public void setThreshold(int threshold) {
        this.threshold = threshold;
    }
}
