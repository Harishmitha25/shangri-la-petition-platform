package com.slpp.slpp_backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "petitions")
public class PetitionModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer petitionId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private Status status = Status.OPEN;

    @Column(nullable = false, length = 255)
    private String petitionTitle;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String petitionText;

    @Column(nullable = false, length = 255)
    private String petitioner;

    @Column(nullable = false, columnDefinition = "INT DEFAULT 0")
    private int signatures = 0;

    @Column(length = 1000)
    private String response;

    public enum Status {
        OPEN, CLOSED;

        @Override
        public String toString() {
            return name().toLowerCase();
        }
    }

    @PrePersist
    @PreUpdate
    public void prePersistOrUpdate() {
        if (status != null) {
            this.status = Status.valueOf(status.toString().toUpperCase());
        }
    }

    public Integer getPetitionId() {
        return petitionId;
    }

    public void setPetitionId(Integer petitionId) {
        this.petitionId = petitionId;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getPetitionTitle() {
        return petitionTitle;
    }

    public void setPetitionTitle(String petitionTitle) {
        this.petitionTitle = petitionTitle;
    }

    public String getPetitionText() {
        return petitionText;
    }

    public void setPetitionText(String petitionText) {
        this.petitionText = petitionText;
    }

    public String getPetitioner() {
        return petitioner;
    }

    public void setPetitioner(String petitioner) {
        this.petitioner = petitioner;
    }

    public int getSignatures() {
        return signatures;
    }

    public void setSignatures(int signatures) {
        this.signatures = signatures;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }

}
