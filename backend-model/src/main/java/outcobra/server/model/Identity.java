package outcobra.server.model;

import outcobra.server.model.interfaces.ParentLinked;

import javax.jdo.annotations.Index;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

@Entity
public class Identity extends AbstractEntity implements ParentLinked {
    @NotNull
    @ManyToOne
    private User user;

    @NotNull
    private String identityType;

    @Index(name = "idx_identity_identifier")
    @NotNull
    private String identifier;
    private String secret;

    public Identity() {
    }

    public Identity(User user, String identityType, String identifier, String secret) {
        this.user = user;
        this.identityType = identityType;
        this.identifier = identifier;
        this.secret = secret;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getIdentityType() {
        return identityType;
    }

    public void setIdentityType(String identityType) {
        this.identityType = identityType;
    }

    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    public String getSecret() {
        return secret;
    }

    public void setSecret(String secret) {
        this.secret = secret;
    }

    @Override
    public ParentLinked getParent() {
        return user;
    }

    @Override
    public Long getId() {
        return id;
    }
}
