package com.slpp.slpp_backend.service;

import com.slpp.slpp_backend.model.LoginRequestModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.slpp.slpp_backend.model.PetitionerModel;
import com.slpp.slpp_backend.repository.PetitionerRepository;
import com.slpp.slpp_backend.repository.BioIdRepository;
import com.slpp.slpp_backend.util.JwtUtil;

import java.util.HashMap;
import java.util.Map;

@Service
public class PetitionerService {

    @Autowired
    private PetitionerRepository petitionerRepository;

    @Autowired
    private BioIdRepository bioIdRepository;
    @Autowired
    private JwtUtil jwtUtil;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public PetitionerModel registerPetitioner(PetitionerModel petitioner) {
        System.out.println("BioID: " + petitioner.getBioid());
        var bioIdOptional = bioIdRepository.findById(petitioner.getBioid());

        var bioId = bioIdRepository.findById(petitioner.getBioid())
                .orElseThrow(() -> new IllegalArgumentException("Invalid BioID."));
        if (bioId.getUsed() == 1) {
            throw new IllegalArgumentException("This BioID is already in use.");
        }

        if (petitionerRepository.existsById(petitioner.getEmail())) {
            throw new IllegalArgumentException("This email is already registered.");
        }

        String hashedPassword = passwordEncoder.encode(petitioner.getPassword());
        petitioner.setPassword(hashedPassword);

        bioId.setUsed(1);
        bioIdRepository.save(bioId);
        PetitionerModel savedPetitioner = petitionerRepository.save(petitioner);
        System.out.println("Saving petitioner: " + petitioner);
        return savedPetitioner;
    }
    public Map<String, String> authenticatePetitioner(LoginRequestModel loginRequest) {
        PetitionerModel petitioner = petitionerRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password."));

        if (!passwordEncoder.matches(loginRequest.getPassword(), petitioner.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password.");
        }

        String token = jwtUtil.generateToken(petitioner.getEmail(), "PETITIONER");
        System.out.println("Generated token role: " + jwtUtil.extractRole(token));

        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("fullName", petitioner.getFullname());

        return response;
    }

}
