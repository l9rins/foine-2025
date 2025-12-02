package com.foine.controller;

import com.foine.model.Post;
import com.foine.model.User;
import com.foine.repository.PostRepository;
import com.foine.repository.UserRepository;
import com.foine.service.PostService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final PostService postService;

    public PostController(PostRepository postRepository, UserRepository userRepository, PostService postService) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.postService = postService;
    }

    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts() {
        return ResponseEntity.ok(postRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Post> getPost(@PathVariable Long id) {
        return postRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createPost(
            Authentication auth,
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "tags", required = false) Set<String> tags) {
        try {
            String username = auth.getName();
            User owner = userRepository.findByUsername(username).orElseThrow();
            Post post = postService.createPost(owner, title, description, file, tags);
            return ResponseEntity.ok(post);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePost(@PathVariable Long id, Authentication auth) {
        return postRepository.findById(id).map(post -> {
            if (!post.getOwner().getUsername().equals(auth.getName())) {
                return ResponseEntity.status(403).body(Map.of("error", "Not authorized"));
            }
            postRepository.delete(post);
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }
}