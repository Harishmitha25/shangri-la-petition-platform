package com.slpp.slpp_backend.service;

import com.slpp.slpp_backend.model.PetitionModel;
import com.slpp.slpp_backend.model.PetitionRequest;
import com.slpp.slpp_backend.model.PetitionResponse;
import com.slpp.slpp_backend.model.Signature;
import com.slpp.slpp_backend.repository.PetitionRepository;
import com.slpp.slpp_backend.repository.PetitionsCommitteeRepository;
import com.slpp.slpp_backend.repository.SignatureRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PetitionService {

    @Autowired
    private PetitionRepository petitionRepository;

    @Autowired
    private PetitionsCommitteeRepository petitionsCommitteeRepository;

    @Autowired
    private SignatureRepository signatureRepository;

    public void createPetition(PetitionRequest request, String petitionerEmail) {
        PetitionModel petition = new PetitionModel();
        petition.setStatus(PetitionModel.Status.OPEN);
        petition.setPetitionTitle(request.getPetitionTitle());
        petition.setPetitionText(request.getPetitionText());
        petition.setPetitioner(petitionerEmail);
        petitionRepository.save(petition);
    }

    public List<PetitionResponse> getAllPetitions() {
        return petitionRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<PetitionResponse> getPetitionsByStatus(String status) {
        PetitionModel.Status enumStatus = PetitionModel.Status.valueOf(status.toUpperCase());
        return petitionRepository.findByStatus(enumStatus)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public PetitionResponse getPetitionByIdResponse(Integer petitionId) {
        PetitionModel petition = petitionRepository.findById(petitionId)
                .orElseThrow(() -> new IllegalArgumentException("Petition not found with ID: " + petitionId));
        return mapToDTO(petition);
    }

    @Transactional
    public void signPetition(Integer petitionId, String signerEmail, String signerName) {
        PetitionModel petition = petitionRepository.findById(petitionId)
                .orElseThrow(() -> new RuntimeException("Petition not found"));

        if (petition.getPetitioner().equals(signerEmail)) {
            throw new RuntimeException("You cannot sign your own petition.");
        }

        if (signatureRepository.existsByPetition_PetitionIdAndSignerEmail(petitionId, signerEmail)) {
            throw new RuntimeException("You have already signed this petition.");
        }

        Signature signature = new Signature();
        signature.setPetition(petition);
        signature.setSignerEmail(signerEmail);
        signature.setSignerName(signerName);
        signatureRepository.save(signature);

        petition.setSignatures(petition.getSignatures() + 1);
        petitionRepository.save(petition);
    }

    public boolean hasUserSigned(Integer petitionId, String signerEmail) {
        return signatureRepository.existsByPetition_PetitionIdAndSignerEmail(petitionId, signerEmail);
    }

    public void respondToPetition(Integer petitionId, String response) {
        PetitionModel petition = petitionRepository.findById(petitionId)
                .orElseThrow(() -> new IllegalArgumentException("Petition not found"));

        if (petition.getStatus() == PetitionModel.Status.CLOSED) {
            throw new IllegalArgumentException("Petition is already closed");
        }

        int threshold = petitionsCommitteeRepository.findById("admin@petition.parliament.sr")
                .orElseThrow(() -> new IllegalArgumentException("Petitions Committee account not found"))
                .getThreshold();

        if (petition.getSignatures() < threshold) {
            throw new IllegalArgumentException("Petition has not met the required signature threshold");
        }

        petition.setResponse(response);
        petition.setStatus(PetitionModel.Status.CLOSED);
        petitionRepository.save(petition);
    }

    private PetitionResponse mapToDTO(PetitionModel petition) {
        PetitionResponse dto = new PetitionResponse();
        dto.setPetition_id(String.valueOf(petition.getPetitionId()));
        dto.setStatus(petition.getStatus().toString().toLowerCase());
        dto.setPetition_title(petition.getPetitionTitle());
        dto.setPetition_text(petition.getPetitionText());
        dto.setPetitioner(petition.getPetitioner());
        dto.setSignatures(String.valueOf(petition.getSignatures()));
        dto.setResponse(petition.getResponse());
        return dto;
    }
}
