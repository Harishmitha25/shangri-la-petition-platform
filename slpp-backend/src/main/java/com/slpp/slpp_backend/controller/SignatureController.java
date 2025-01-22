package com.slpp.slpp_backend.controller;

import com.slpp.slpp_backend.model.Signature;
import com.slpp.slpp_backend.service.PetitionService;
import com.slpp.slpp_backend.service.SignatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/slpp/signatures")
public class SignatureController {

    @Autowired
    private SignatureService signatureService;

    @GetMapping
    public ResponseEntity<?> getSignaturesByUser(@AuthenticationPrincipal String signerEmail) {
        try {
            List<Signature> signatures = signatureService.getSignaturesByUser(signerEmail);
            return ResponseEntity.ok(signatures);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred: " + e.getMessage());
        }
    }
}
