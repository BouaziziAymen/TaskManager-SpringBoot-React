package com.taskmanager.backend.server.controller;

import com.taskmanager.backend.server.dtos.TaskCreationDto;
import com.taskmanager.backend.server.entities.Task;
import com.taskmanager.backend.server.services.TaskService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.StreamSupport;

@AllArgsConstructor
@RestController
@RequestMapping("api/v1/taskmanager")
@Slf4j
@CrossOrigin
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping("/{id}")
    public Task getTaskById(@PathVariable("id") UUID id) {
        return taskService.findTaskById(id);
    }
    @PostMapping
    public Task postTask(@Valid @RequestBody TaskCreationDto taskCreationDto){
        return taskService.addTask(Task.builder().name(taskCreationDto.getName()).build());
    }

    @DeleteMapping("/{id}")
    public void deleteTaskById(@PathVariable("id") UUID id) {
        taskService.removeTaskById(id);
    }

    @GetMapping
    @CrossOrigin
    public List<Task> getTasks(Pageable pageable) {
        //SLF4J
        log.info("Using SLF4J: Getting task list - getTasks()");
        return StreamSupport.stream(taskService.findTasks(pageable).spliterator(), false).toList();
    }
}
g