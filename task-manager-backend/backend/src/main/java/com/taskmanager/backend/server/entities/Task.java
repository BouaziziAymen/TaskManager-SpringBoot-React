package com.taskmanager.backend.server.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name="tasks")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class Task {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO,generator="UUID")
    @Column(nullable=false, updatable=false)
    private UUID id;

    @NonNull
    private String name;

    private boolean done;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
