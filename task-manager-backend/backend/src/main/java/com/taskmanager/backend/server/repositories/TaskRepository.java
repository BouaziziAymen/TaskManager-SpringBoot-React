package com.taskmanager.backend.server.repositories;

import com.taskmanager.backend.server.entities.Task;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TaskRepository extends JpaRepository<Task, UUID> {
    List<Task> findByUserId(Long userId, Pageable pageable);
}
