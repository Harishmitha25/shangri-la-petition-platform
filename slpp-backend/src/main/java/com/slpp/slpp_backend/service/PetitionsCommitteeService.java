package com.slpp.slpp_backend.service;

import com.slpp.slpp_backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.slpp.slpp_backend.model.PetitionsCommitteeModel;
import com.slpp.slpp_backend.model.LoginRequestModel;
import com.slpp.slpp_backend.repository.PetitionsCommitteeRepository;

import java.util.HashMap;
import java.util.Map;

@Service
public class PetitionsCommitteeService {

    @Autowired
    private PetitionsCommitteeRepository petitionsCommitteeRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    @Autowired
    private JwtUtil jwtUtil;

    public Map<String, String> authenticatePetitionsCommittee(LoginRequestModel loginRequest) {
        PetitionsCommitteeModel committee = petitionsCommitteeRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password."));

        if (!passwordEncoder.matches(loginRequest.getPassword(), committee.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password.");
        }

        String token = jwtUtil.generateToken(committee.getEmail(), "PETITIONS_COMMITTEE");
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("fullName", "Admin");
        return response;
    }
    public void updateThreshold(String email, int threshold) {
        PetitionsCommitteeModel committee = petitionsCommitteeRepository.findById(email)
                .orElseThrow(() -> new IllegalArgumentException("Petitions Committee account not found"));

        committee.setThreshold(threshold);
        petitionsCommitteeRepository.save(committee);
    }

    public Integer getThreshold(String email) {
        return petitionsCommitteeRepository
                .findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Email not found."))
                .getThreshold();
    }

}
