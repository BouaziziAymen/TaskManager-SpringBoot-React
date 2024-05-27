package com.taskmanager.backend.server.controller;

import com.taskmanager.backend.server.dtos.TaskCreationDto;
import com.taskmanager.backend.server.dtos.TaskUpdateDto;
import com.taskmanager.backend.server.entities.Task;
import com.taskmanager.backend.server.entities.User;
import com.taskmanager.backend.server.services.TaskService;
import com.taskmanager.backend.server.services.UserService;
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

    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public Task getTaskById(@PathVariable("id") UUID id) {
        return taskService.findTaskById(id);
    }
    @PostMapping
    public Task postTask(@Valid @RequestBody TaskCreationDto taskCreationDto){
        User user = userService.getById(taskCreationDto.getUserId());
        return taskService.addTask(Task.builder().name(taskCreationDto.getName()).user(user).build());
    }

    @DeleteMapping("/{id}")
    public void deleteTaskById(@PathVariable("id") UUID id) {
        taskService.removeTaskById(id);
    }

    @GetMapping
    public List<Task> getTasks(Pageable pageable,@RequestParam("user_id") Long id) {
        //SLF4J
        log.info("Using SLF4J: Getting task list - getTasks()");
        return StreamSupport.stream(taskService.findTasks(pageable,id).spliterator(), false).toList();
    }

    @PutMapping
    public Task updateTask(@Valid @RequestBody TaskUpdateDto taskUpdateDto) {
        return taskService.updateTask(taskUpdateDto);
    }
}
