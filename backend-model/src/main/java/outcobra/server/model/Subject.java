package outcobra.server.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

import outcobra.server.model.interfaces.ParentLinked;

@Entity
public class Subject implements ParentLinked {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    private String name;

    @ManyToOne
    private Semester semester;

    @OneToMany(mappedBy = "subject")
    private List<TimetableEntry> timetableEntries;

    @OneToMany(mappedBy = "subject")
    private List<Task> tasks;

    @OneToMany(mappedBy = "subject")
    private List<MarkReportEntry> markReportEntries;

    @OneToMany(mappedBy = "subject")
    private List<Exam> exams;

    @OneToOne
    private MarkGroup markGroup;

    @ManyToOne
    private Teacher teacher;

    //region constructors

    public Subject(String name, Semester semester, List<TimetableEntry> timetableEntries, List<Task> tasks,
                   List<MarkReportEntry> markReportEntries, List<Exam> exams, MarkGroup markGroup, Teacher teacher) {
        this.name = name;
        this.semester = semester;
        this.timetableEntries = timetableEntries;
        this.tasks = tasks;
        this.markReportEntries = markReportEntries;
        this.exams = exams;
        this.markGroup = markGroup;
        this.teacher = teacher;
    }

    public Subject() {
        this.timetableEntries = new ArrayList<>();
        this.tasks = new ArrayList<>();
        this.markReportEntries = new ArrayList<>();
        this.exams = new ArrayList<>();
    }

    //endregion

    //region default functions

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

    public Semester getSemester() {
        return semester;
    }

    public void setSemester(Semester semester) {
        this.semester = semester;
    }

    public List<TimetableEntry> getTimetableEntries() {
        return timetableEntries;
    }

    public void setTimetableEntries(List<TimetableEntry> timetableEntries) {
        this.timetableEntries = timetableEntries;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }

    public List<MarkReportEntry> getMarkReportEntries() {
        return markReportEntries;
    }

    public void setMarkReportEntries(List<MarkReportEntry> markReportEntries) {
        this.markReportEntries = markReportEntries;
    }

    public List<Exam> getExams() {
        return exams;
    }

    public void setExams(List<Exam> exams) {
        this.exams = exams;
    }

    public MarkGroup getMarkGroup() {
        return markGroup;
    }

    public void setMarkGroup(MarkGroup markGroup) {
        this.markGroup = markGroup;
    }

    public Teacher getTeacher() {
        return teacher;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }

    @SuppressWarnings("SimplifiableIfStatement")
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Subject)) return false;

        Subject subject = (Subject) o;

        if (!getId().equals(subject.getId())) return false;
        if (getName() != null ? !getName().equals(subject.getName()) : subject.getName() != null)
            return false;
        if (getSemester() != null ? !getSemester().equals(subject.getSemester()) : subject.getSemester() != null)
            return false;
        if (getTimetableEntries() != null ? !getTimetableEntries().equals(subject.getTimetableEntries()) : subject.getTimetableEntries() != null)
            return false;
        if (getTasks() != null ? !getTasks().equals(subject.getTasks()) : subject.getTasks() != null)
            return false;
        if (getMarkReportEntries() != null ? !getMarkReportEntries().equals(subject.getMarkReportEntries()) : subject.getMarkReportEntries() != null)
            return false;
        if (getExams() != null ? !getExams().equals(subject.getExams()) : subject.getExams() != null)
            return false;
        if (getMarkGroup() != null ? !getMarkGroup().equals(subject.getMarkGroup()) : subject.getMarkGroup() != null)
            return false;
        return getTeacher() != null ? getTeacher().equals(subject.getTeacher()) : subject.getTeacher() == null;

    }

    @Override
    public int hashCode() {
        int result = getId().hashCode();
        result = 31 * result + (getName() != null ? getName().hashCode() : 0);
        result = 31 * result + (getSemester() != null ? getSemester().hashCode() : 0);
        result = 31 * result + (getTimetableEntries() != null ? getTimetableEntries().hashCode() : 0);
        result = 31 * result + (getTasks() != null ? getTasks().hashCode() : 0);
        result = 31 * result + (getMarkReportEntries() != null ? getMarkReportEntries().hashCode() : 0);
        result = 31 * result + (getExams() != null ? getExams().hashCode() : 0);
        result = 31 * result + (getMarkGroup() != null ? getMarkGroup().hashCode() : 0);
        result = 31 * result + (getTeacher() != null ? getTeacher().hashCode() : 0);
        return result;
    }

    @Override
    public ParentLinked getParent() {
        return semester;
    }
    //endregion
}
