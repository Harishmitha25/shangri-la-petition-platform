package com.slpp.slpp_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.slpp.slpp_backend.model.BioIdModel;

public interface BioIdRepository extends JpaRepository<BioIdModel, String> {
}
