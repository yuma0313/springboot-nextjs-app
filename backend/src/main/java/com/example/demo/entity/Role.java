package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

import lombok.Data;

@Entity
@Table(name = "roles")
@Data
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="role_id", nullable = false)
    private int roleId;

    @Column(name="role_name", nullable = false)
    private String roleName;

    @Column(name="can_edit", nullable = false)
    private boolean canEdit;

    @Column(name="can_add", nullable = false)
    private boolean canAdd;

    @Column(name="can_delete", nullable = false)
    private boolean canDelete;

    @Column(name="can_view", nullable = false)
    private boolean canView;
}
