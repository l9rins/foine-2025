package com.foine.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.foine.model.Post;
import com.foine.model.Tag;
import com.foine.model.User;
import com.foine.repository.PostRepository;
import com.foine.repository.TagRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
public class PostService {

    private final Cloudinary cloudinary;
    private final PostRepository postRepository;
    private final TagRepository tagRepository;

    public PostService(@Value("${cloudinary.cloud_name}") String cloudName,
                       @Value("${cloudinary.api_key}") String apiKey,
                       @Value("${cloudinary.api_secret}") String apiSecret,
                       PostRepository postRepository,
                       TagRepository tagRepository) {
        this.cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", cloudName,
                "api_key", apiKey,
                "api_secret", apiSecret));
        this.postRepository = postRepository;
        this.tagRepository = tagRepository;
    }

    public Post createPost(User owner, String title, String description, MultipartFile file, Set<String> tagNames) throws IOException {
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap("folder", "foine_posts"));
        String url = (String) uploadResult.get("secure_url");
        String publicId = (String) uploadResult.get("public_id");

        Post post = new Post();
        post.setTitle(title);
        post.setDescription(description);
        post.setImageUrl(url);
        post.setImagePublicId(publicId);
        post.setOwner(owner);

        Set<Tag> tags = new HashSet<>();
        if (tagNames != null) {
            for (String t : tagNames) {
                Tag tag = tagRepository.findByName(t).orElseGet(() -> {
                    Tag nt = new Tag();
                    nt.setName(t);
                    return tagRepository.save(nt);
                });
                tags.add(tag);
            }
        }
        post.setTags(tags);
        return postRepository.save(post);
    }
}
