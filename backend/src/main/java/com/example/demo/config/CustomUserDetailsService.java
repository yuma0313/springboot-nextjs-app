package com.example.demo.config;

import com.example.demo.entity.Employee;
import com.example.demo.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Employee employee = employeeRepository.findByEmail(username);
        if (employee == null) {
            throw new UsernameNotFoundException("User not found.");
        }

        // 付与された権限を持つリストを作成する
        List<GrantedAuthority> authorities = new ArrayList<>();

        // ロールに紐づく権限を追加する
        if (employee.getRole().isCanEdit()) {
            authorities.add(new SimpleGrantedAuthority("CAN_EDIT"));
        }
        if (employee.getRole().isCanAdd()) {
            authorities.add(new SimpleGrantedAuthority("CAN_ADD"));
        }
        if (employee.getRole().isCanDelete()) {
            authorities.add(new SimpleGrantedAuthority("CAN_DELETE"));
        }
        if (employee.getRole().isCanView()) {
            authorities.add(new SimpleGrantedAuthority("CAN_VIEW"));
        }

        return new User(employee.getEmail(), employee.getPassword(), authorities);
    }
}
