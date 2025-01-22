package com.slpp.slpp_backend.service;

import com.slpp.slpp_backend.model.Signature;
import com.slpp.slpp_backend.repository.SignatureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SignatureService {

    @Autowired
    private SignatureRepository signatureRepository;

    public List<Signature> getSignaturesByUser(String signerEmail) {
        System.out.println("SIGNER EMAIL " + signerEmail);
        return signatureRepository.findBySignerEmail(signerEmail);
    }
}
