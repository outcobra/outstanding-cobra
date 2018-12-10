package db.migration.model.next;

public class NextSchoolYear {
    private Long id;
    private String name;
    private String validFrom;
    private String validTo;

    public NextSchoolYear() {
    }

    public NextSchoolYear(String name, String validFrom, String validTo) {
        this.name = name;
        this.validFrom = validFrom;
        this.validTo = validTo;
    }

    public boolean isCongruent(NextSchoolYear other) {
        return this.name.equals(other.getName()) &&
                this.validFrom.equals(other.getValidFrom()) &&
                this.validTo.equals(other.getValidTo());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getValidFrom() {
        return validFrom;
    }

    public void setValidFrom(String validFrom) {
        this.validFrom = validFrom;
    }

    public String getValidTo() {
        return validTo;
    }

    public void setValidTo(String validTo) {
        this.validTo = validTo;
    }
}
