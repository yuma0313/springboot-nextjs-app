package com.example.demo;

import com.example.demo.entity.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.example.demo.repository.EmployeeRepository;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class HelloController {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Autowired
    EmployeeRepository employeeRepository;

    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody Employee employee) {
        // リポジトリからユーザーを取得します。
        Employee existingEmployee = employeeRepository.findByEmail(employee.getEmail());
        if (existingEmployee == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid login details");
        }

        // パスワードをチェックします。
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        boolean isPasswordMatch = passwordEncoder.matches(employee.getPassword(), existingEmployee.getPassword());
        if (!isPasswordMatch) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid login details");
        }

        Map<String, String> responseBody = new HashMap<>();
        responseBody.put("message", "Login successful");

        return ResponseEntity.ok(responseBody);
    }

    @GetMapping("/auth/check")
    public ResponseEntity<?> authCheck() {
        try {
            // If user is authenticated, this line won't throw exception
            Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if (principal == null) {
                return ResponseEntity.status(401).body("Not Authenticated");
            }
            return ResponseEntity.ok().body("Authenticated");
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Not Authenticated");
        }
    }

    @PreAuthorize("hasAuthority('CAN_VIEW')")
    @GetMapping("/employees")
    public List<Map<String, Object>> getEmployees() {
        String sql = "SELECT \n" +
                "  e.name, \n" +
                "  e.email, \n" +
                "  e.password, \n" +
                "  e.phone_number, \n" +
                "  e.status, \n" +
                "  e.join_date, \n" +
                "  e.leave_date,\n" +
                "  p.position_name, \n" +
                "  d.department_name, \n" +
                "  r.role_name \n" +
                "FROM \n" +
                "  employees e \n" +
                "LEFT JOIN \n" +
                "  positions p ON e.position_id = p.position_id \n" +
                "LEFT JOIN \n" +
                "  departments d ON e.department_id = d.department_id \n" +
                "LEFT JOIN \n" +
                "  roles r ON e.role_id = r.role_id;\n";
        List<Map<String, Object>> list = jdbcTemplate.queryForList(sql);
        return list;
    }

    @PreAuthorize("hasAuthority('CAN_VIEW')")
    @GetMapping("/employees/{id}")
    public Map<String, Object> getEmployeeDetail(@PathVariable("id") int id) {
        String sql = "SELECT \n" +
                "  e.name, \n" +
                "  e.email, \n" +
                "  e.password, \n" +
                "  e.phone_number, \n" +
                "  e.status, \n" +
                "  e.join_date, \n" +
                "  e.leave_date,\n" +
                "  p.position_name, \n" +
                "  d.department_name, \n" +
                "  r.role_name \n" +
                "FROM \n" +
                "  employees e \n" +
                "LEFT JOIN \n" +
                "  positions p ON e.position_id = p.position_id \n" +
                "LEFT JOIN \n" +
                "  departments d ON e.department_id = d.department_id \n" +
                "LEFT JOIN \n" +
                "  roles r ON e.role_id = r.role_id WHERE employee_id = ?";

        Map<String, Object> map = jdbcTemplate.queryForMap(sql, id);

        return map;
    }

    @PreAuthorize("hasAuthority('CAN_ADD')")
    @PostMapping("/employees")
    public Employee insertEmployee(@RequestBody Employee newEmployee) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(newEmployee.getPassword());
        newEmployee.setPassword(hashedPassword);
        return employeeRepository.save(newEmployee);
    }

    @PreAuthorize("hasAuthority('CAN_EDIT')")
    @PutMapping("/employees/{id}")
    public Employee updateEmployee(@PathVariable Integer id, @RequestBody Employee updatedEmployee) {
        // まず、指定されたIDのエンティティが存在することを確認します。
        return employeeRepository.findById(id)
                .map(employee -> {
                    // エンティティが存在した場合、新しいデータで上書きします。
                    employee.setName(updatedEmployee.getName());
                    employee.setEmail(updatedEmployee.getEmail());
                    employee.setPhoneNumber(updatedEmployee.getPhoneNumber());
                    employee.setStatus(updatedEmployee.getStatus());
                    employee.setJoinDate(updatedEmployee.getJoinDate());
                    employee.setLeaveDate(updatedEmployee.getLeaveDate());
                    employee.setPositionId(updatedEmployee.getPositionId());
                    employee.setDepartmentId(updatedEmployee.getDepartmentId());
                    employee.setRoleId(updatedEmployee.getRoleId());

                    // 変更をデータベースに保存します。
                    return employeeRepository.save(employee);
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found"));
    }

    @PreAuthorize("hasAuthority('CAN_DELETE')")
    @DeleteMapping("/employees/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Integer id) {
        return employeeRepository.findById(id)
                .map(employee -> {
                    employeeRepository.delete(employee);
                    return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found"));
    }
}
