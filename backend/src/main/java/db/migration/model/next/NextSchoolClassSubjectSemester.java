package db.migration.model.next;

public class NextSchoolClassSubjectSemester {
    private Long schoolClassId;
    private Long subjectId;
    private Long semesterId;

    public NextSchoolClassSubjectSemester() {
    }

    public NextSchoolClassSubjectSemester(Long schoolClassId, Long subjectId, Long semesterId) {
        this.schoolClassId = schoolClassId;
        this.subjectId = subjectId;
        this.semesterId = semesterId;
    }

    public Long getSchoolClassId() {
        return schoolClassId;
    }

    public void setSchoolClassId(Long schoolClassId) {
        this.schoolClassId = schoolClassId;
    }

    public Long getSubjectId() {
        return subjectId;
    }

    public void setSubjectId(Long subjectId) {
        this.subjectId = subjectId;
    }

    public Long getSemesterId() {
        return semesterId;
    }

    public void setSemesterId(Long semesterId) {
        this.semesterId = semesterId;
    }
}
