package com.slpp.slpp_backend.controller;

import com.slpp.slpp_backend.model.LoginRequestModel;
import com.slpp.slpp_backend.model.PetitionerModel;
import com.slpp.slpp_backend.service.PetitionerService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/slpp/petitioner")
public class PetitionerController {

    @Autowired
    private PetitionerService petitionerService;

    @PostMapping("/register")
    public ResponseEntity<?> registerPetitioner(@RequestBody PetitionerModel petitioner) {
        try {
            return ResponseEntity.ok(petitionerService.registerPetitioner(petitioner));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginPetitioner(@RequestBody LoginRequestModel loginRequest) {
        try {
            System.out.println("Login request received: " + loginRequest);

            System.out.println(loginRequest);
            Map<String, String> response = petitionerService.authenticatePetitioner(loginRequest);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Internal Server Error: " + e.getMessage());
        }
    }

    @GetMapping("/dashboard")
    public ResponseEntity<?> getDashboard(HttpServletRequest request) {
        Claims claims = (Claims) request.getAttribute("claims");

        if (claims == null || !"PETITIONER".equals(claims.get("role"))) {
            return ResponseEntity.status(403).body("Unauthorized access");
        }

        String username = claims.getSubject();
        return ResponseEntity.ok("Welcome to the Petitioner Dashboard, " + username + "!");
    }
}
