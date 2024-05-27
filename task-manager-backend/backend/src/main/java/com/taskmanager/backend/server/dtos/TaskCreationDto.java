package com.taskmanager.backend.server.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskCreationDto {

    private Long userId;
    private String name;
}
