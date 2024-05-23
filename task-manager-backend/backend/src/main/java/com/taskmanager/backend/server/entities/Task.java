package com.taskmanager.backend.server.entities;

import jakarta.persistence.*;
import lombok.*;

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
    private Long id;

    @NonNull
    private String name;

    private boolean done;
}
