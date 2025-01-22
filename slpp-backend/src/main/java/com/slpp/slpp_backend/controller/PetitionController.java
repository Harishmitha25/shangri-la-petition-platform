package com.slpp.slpp_backend.controller;

import com.slpp.slpp_backend.model.PetitionRequest;
import com.slpp.slpp_backend.model.PetitionResponse;
import com.slpp.slpp_backend.service.PetitionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/slpp/petitions")
public class PetitionController {

    @Autowired
    private PetitionService petitionService;

    @PostMapping("/create")
    public ResponseEntity<?> createPetition(
            @Valid @RequestBody PetitionRequest request,
            @AuthenticationPrincipal String userEmail) {
        try {
            petitionService.createPetition(request, userEmail);
            return ResponseEntity.ok("Petition created successfully!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating petition: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getPetitions(@RequestParam(required = false) String status) {
        try {
            List<PetitionResponse> petitions;
            if (status == null || status.isEmpty()) {
                petitions = petitionService.getAllPetitions();
            } else {
                petitions = petitionService.getPetitionsByStatus(status);
            }

            Map<String, Object> response = new HashMap<>();
            response.put("petitions", petitions);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred while fetching petitions: " + e.getMessage());
        }
    }

    @GetMapping("/{petitionId}")
    public ResponseEntity<?> getPetitionById(@PathVariable Integer petitionId) {
        try {
            PetitionResponse petition = petitionService.getPetitionByIdResponse(petitionId);

            Map<String, Object> response = new HashMap<>();
            response.put("petition", petition);

            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred: " + e.getMessage());
        }
    }

    @PostMapping("/{petitionId}/sign")
    public ResponseEntity<?> signPetition(
            @PathVariable Integer petitionId,
            @RequestBody Map<String, String> requestBody,
            @AuthenticationPrincipal String signerEmail) {
        try {
            String signerName = requestBody.get("signerName");
            petitionService.signPetition(petitionId, signerEmail, signerName);
            return ResponseEntity.ok("Petition signed successfully!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{petitionId}/signed")
    public ResponseEntity<Boolean> isSigned(
            @PathVariable Integer petitionId,
            @AuthenticationPrincipal String signerEmail) {
        try {
            boolean signed = petitionService.hasUserSigned(petitionId, signerEmail);
            return ResponseEntity.ok(signed);
        } catch (Exception e) {
            return ResponseEntity.status(400).body(false);
        }
    }

    @PostMapping("/{petitionId}/respond")
    public ResponseEntity<?> respondToPetition(
            @PathVariable Integer petitionId,
            @RequestBody Map<String, String> requestBody) {
        try {
            String responseText = requestBody.get("responseText");
            petitionService.respondToPetition(petitionId, responseText);
            return ResponseEntity.ok("Response submitted successfully!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
