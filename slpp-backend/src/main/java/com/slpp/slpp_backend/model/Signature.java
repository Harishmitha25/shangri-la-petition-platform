package com.slpp.slpp_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "signatures")
public class Signature {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "petition_id", nullable = false)
    private PetitionModel petition;

    @Column(nullable = false)
    private String signerEmail;

    @Column(nullable = false)
    private String signerName;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public PetitionModel getPetition() {
        return petition;
    }

    public void setPetition(PetitionModel petition) {
        this.petition = petition;
    }

    public String getSignerEmail() {
        return signerEmail;
    }

    public void setSignerEmail(String signerEmail) {
        this.signerEmail = signerEmail;
    }

    public String getSignerName() {
        return signerName;
    }

    public void setSignerName(String signerName) {
        this.signerName = signerName;
    }
}
