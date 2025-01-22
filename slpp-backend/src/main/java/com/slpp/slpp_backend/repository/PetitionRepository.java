package com.slpp.slpp_backend.repository;

import com.slpp.slpp_backend.model.PetitionModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PetitionRepository extends JpaRepository<PetitionModel, Integer> {
    List<PetitionModel> findByStatus(PetitionModel.Status status);
}
