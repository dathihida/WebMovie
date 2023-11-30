package com.WebMovie.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.WebMovie.Entity.Comment;

public interface CommentReporitory extends JpaRepository<Comment, Integer>{

}
