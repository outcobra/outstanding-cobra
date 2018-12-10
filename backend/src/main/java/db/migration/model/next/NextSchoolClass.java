package db.migration.model.next;

public class NextSchoolClass {
    private Long id;
    private String normalizedName;

    public NextSchoolClass() {
    }

    public NextSchoolClass(Long id, String normalizedName) {
        this.id = id;
        this.normalizedName = normalizedName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNormalizedName() {
        return normalizedName;
    }

    public void setNormalizedName(String normalizedName) {
        this.normalizedName = normalizedName;
    }
}
