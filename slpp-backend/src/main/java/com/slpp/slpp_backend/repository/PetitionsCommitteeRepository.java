package com.slpp.slpp_backend.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.slpp.slpp_backend.model.PetitionsCommitteeModel;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface PetitionsCommitteeRepository extends JpaRepository<PetitionsCommitteeModel, String> {

    Optional<PetitionsCommitteeModel> findByEmail(String email);

    @Modifying
    @Transactional
    @Query("UPDATE PetitionsCommitteeModel pc SET pc.threshold = :threshold WHERE pc.email = :email")
    void updateSignatureThreshold(@Param("email") String email, @Param("threshold") int threshold);
}
