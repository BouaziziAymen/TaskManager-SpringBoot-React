package com.taskmanager.backend.server.seeder;
import com.taskmanager.backend.server.entities.ERole;
import com.taskmanager.backend.server.entities.Role;
import com.taskmanager.backend.server.repositories.RoleRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import java.util.Arrays;
import java.util.List;

@Component
public class RoleDataSeeder {
    @Autowired
    private RoleRepository roleRepository;
    @EventListener
    @Transactional
    public void LoadRoles(ContextRefreshedEvent event) {
        List<ERole> roles = Arrays.stream(ERole.values()).toList();

        for(ERole erole: roles) {
            if (roleRepository.findByName(erole)==null) {
                roleRepository.save(new Role(erole));
            }
        }
    }
}
