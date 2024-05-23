package com.taskmanager.backend.server.services;

import com.taskmanager.backend.server.entities.Task;
import com.taskmanager.backend.server.exception.NotFoundException;
import com.taskmanager.backend.server.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public Task addTask(Task task){
         return taskRepository.save(task);
    }
    public Task findTaskById(UUID id){
        return findOrThrow(id);
    }
    public void removeTaskById(UUID id){
        findOrThrow(id);
        taskRepository.deleteById(id);
    }
    public void updateAntiHero(UUID id, Task task){
        findOrThrow(id);
        taskRepository.save(task);
    }
    private Task findOrThrow(final UUID id){
        return taskRepository.findById(id).orElseThrow(()->new NotFoundException("Anti-Hero not found id="+id));
    }

    public Iterable<Task> findAllTasks(){
        return taskRepository.findAll();
    }

    public Iterable<Task> findTasks(Pageable pageable){
        return taskRepository.findAll(pageable);
    }
}
