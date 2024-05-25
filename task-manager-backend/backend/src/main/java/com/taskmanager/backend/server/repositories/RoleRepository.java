package com.taskmanager.backend.server.repositories;

import com.taskmanager.backend.server.entities.ERole;
import com.taskmanager.backend.server.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByName(ERole name);
}
