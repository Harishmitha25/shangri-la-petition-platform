package com.slpp.slpp_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "petitioners")
public class PetitionerModel {

    @Id
    @Column(name = "email", nullable = false, unique = true, length = 255)
    private String email;

    @Column(name = "fullname", nullable = false, length = 255)
    private String fullname;

    @Column(name = "dob", nullable = false)
    private String dob;

    @Column(name = "password", nullable = false, length = 255)
    private String password;

    @Column(name = "bioid", nullable = false, length = 20)
    private String bioid;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public String   getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getBioid() {
        return bioid;
    }

    public void setBioid(String bioid) {
        this.bioid = bioid;
    }
}
