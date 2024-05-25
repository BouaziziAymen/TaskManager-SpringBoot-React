package com.taskmanager.backend.server.dtos;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class TaskUpdateDto {
    private UUID id;
    private String name;
}
