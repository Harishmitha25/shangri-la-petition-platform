package com.slpp.slpp_backend.repository;

import com.slpp.slpp_backend.model.Signature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SignatureRepository extends JpaRepository<Signature, Integer> {
    boolean existsByPetition_PetitionIdAndSignerEmail(Integer petitionId, String signerEmail);

    List<Signature> findBySignerEmail(String signerEmail);
}
