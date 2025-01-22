package com.slpp.slpp_backend.model;

public class PetitionResponse {
    private String petition_id;
    private String status;
    private String petition_title;
    private String petition_text;
    private String petitioner;
    private String signatures;
    private String response;

    public String getPetition_id() {
        return petition_id;
    }

    public void setPetition_id(String petition_id) {
        this.petition_id = petition_id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPetition_title() {
        return petition_title;
    }

    public void setPetition_title(String petition_title) {
        this.petition_title = petition_title;
    }

    public String getPetition_text() {
        return petition_text;
    }

    public void setPetition_text(String petition_text) {
        this.petition_text = petition_text;
    }

    public String getPetitioner() {
        return petitioner;
    }

    public void setPetitioner(String petitioner) {
        this.petitioner = petitioner;
    }

    public String getSignatures() {
        return signatures;
    }

    public void setSignatures(String signatures) {
        this.signatures = signatures;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }
}
