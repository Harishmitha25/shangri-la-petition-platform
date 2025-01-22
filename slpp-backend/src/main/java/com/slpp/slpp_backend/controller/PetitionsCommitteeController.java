package com.slpp.slpp_backend.controller;

import com.slpp.slpp_backend.model.LoginRequestModel;
import com.slpp.slpp_backend.model.ThresholdRequest;
import com.slpp.slpp_backend.service.PetitionsCommitteeService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/slpp/petitions-committee")
public class PetitionsCommitteeController {

    @Autowired
    private PetitionsCommitteeService petitionsCommitteeService;

    @PostMapping("/login")
    public ResponseEntity<?> loginPetitionsCommittee(@RequestBody LoginRequestModel loginRequest) {
        try {
            Map<String, String> response = petitionsCommitteeService.authenticatePetitionsCommittee(loginRequest);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Internal Server Error: " + e.getMessage());
        }
    }

    @GetMapping("/dashboard")
    public ResponseEntity<?> getCommitteeDashboard(HttpServletRequest request) {
        Claims claims = (Claims) request.getAttribute("claims");

        if (claims == null || !"PETITIONS_COMMITTEE".equals(claims.get("role"))) {
            return ResponseEntity.status(403).body("Unauthorized access");
        }

        String username = claims.getSubject();
        return ResponseEntity.ok("Welcome to the Petitions Committee Dashboard, " + username + "!");
    }
    @PostMapping("/threshold")
    public ResponseEntity<?> updateSignatureThreshold(@RequestBody ThresholdRequest request, HttpServletRequest httpRequest) {
        try {
            Claims claims = (Claims) httpRequest.getAttribute("claims");
            if (claims == null || !"PETITIONS_COMMITTEE".equals(claims.get("role"))) {
                return ResponseEntity.status(403).body("Unauthorized access");
            }

            String email = claims.getSubject();
            petitionsCommitteeService.updateThreshold(email, request.getThreshold());
            return ResponseEntity.ok("Threshold updated successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to update threshold: " + e.getMessage());
        }
    }


    @GetMapping("/threshold")
    public ResponseEntity<?> getSignatureThreshold(HttpServletRequest request) {
        try {
            Claims claims = (Claims) request.getAttribute("claims");
            if (claims == null || !"PETITIONS_COMMITTEE".equals(claims.get("role"))) {
                System.out.println("Inside check");
                return ResponseEntity.status(403).body("Unauthorized access");
            }

            String email = claims.getSubject();
            Integer threshold = petitionsCommitteeService.getThreshold(email);
            return ResponseEntity.ok(threshold);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error retrieving threshold: " + e.getMessage());
        }
    }


}
