package db.migration.model.legacy;

public class User {
    private Long id;
    private String mail;
    private String username;

    public User(Long id, String mail, String username) {
        this.id = id;
        this.mail = mail;
        this.username = username;
    }

    public Long getId() {
        return id;
    }

    public String getMail() {
        return mail;
    }

    public String getUsername() {
        return username;
    }
}
