package com.slpp.slpp_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.slpp.slpp_backend.model.PetitionerModel;
import java.util.Optional;

public interface PetitionerRepository extends JpaRepository<PetitionerModel, String> {
    Optional<PetitionerModel> findByEmail(String email);
}
