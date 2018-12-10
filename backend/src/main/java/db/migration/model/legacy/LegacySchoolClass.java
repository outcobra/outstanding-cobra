package db.migration.model.legacy;

public class LegacySchoolClass {
    private Long id;
    private String normalizedName;

    public LegacySchoolClass(Long id, String normalizedName) {
        this.id = id;
        this.normalizedName = normalizedName;
    }

    public Long getId() {
        return id;
    }

    public String getNormalizedName() {
        return normalizedName;
    }
}
