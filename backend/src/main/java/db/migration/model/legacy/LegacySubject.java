package db.migration.model.legacy;

public class LegacySubject {
    private Long id;
    private String name;
    private String color;
    private Long markGroupId;
    private Long semesterId;

    public LegacySubject(Long id, String name, String color, Long markGroupId, Long semesterId) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.markGroupId = markGroupId;
        this.semesterId = semesterId;
    }

    public boolean isCongruent(LegacySubject other) {
        return this.name.equals(other.getName());
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getColor() {
        return color;
    }

    public Long getMarkGroupId() {
        return markGroupId;
    }

    public Long getSemesterId() {
        return semesterId;
    }

    public void setSemesterId(Long semesterId) {
        this.semesterId = semesterId;
    }
}
