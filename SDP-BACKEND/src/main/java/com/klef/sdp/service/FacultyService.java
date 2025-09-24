package com.klef.sdp.service;

import com.klef.sdp.entity.Faculty;
import com.klef.sdp.repository.FacultyRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FacultyService {

    @Autowired
    private FacultyRepository repo;

    public Faculty register(Faculty faculty) {
        return repo.save(faculty);
    }

    public Faculty login(String email, String password) {
        return repo.findByEmailAndPassword(email, password);
    }
}
