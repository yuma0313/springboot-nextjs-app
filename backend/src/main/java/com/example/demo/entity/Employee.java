package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.sql.Date;
import java.util.Collection;
import java.util.Collections;

@Entity
@Table(name = "employees")
@Data
public class Employee implements UserDetails{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="employee_id", nullable = false)
    private int employeeId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name="phone_number", nullable = false)
    private String phoneNumber;

    @Column(nullable = false)
    private String status;

    @Column(name="join_date", nullable = false)
    private Date joinDate;

    @Column(name="leave_date")
    private Date leaveDate;

    @Column(name="position_id", nullable = false)
    private Integer positionId;

    @Column(name="department_id", nullable = false)
    private Integer departmentId;

    @Column(name="role_id", nullable = false)
    private Integer roleId;

    @ManyToOne
    @JoinColumn(name="role_id", insertable = false, updatable = false)
    private Role role;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptyList(); // It's better to return an empty collection than null
    }

    @Override
    public String getPassword() {
        return password; // Corrected from recursive call to return the password field
    }

    @Override
    public String getUsername() {
        return getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
