package com.slpp.slpp_backend.model;

import jakarta.validation.constraints.NotBlank;

public class PetitionRequest {

    @NotBlank(message = "Petition title is required")
    private String petitionTitle;

    @NotBlank(message = "Petition text is required")
    private String petitionText;

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
}
