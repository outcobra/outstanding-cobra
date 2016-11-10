package outcobra.server.model;

import outcobra.server.model.dto.TaskDto;
import outcobra.server.model.interfaces.Mapper;
import outcobra.server.model.interfaces.OutcobraEntity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;


@Entity

public class Task implements OutcobraEntity<Task, TaskDto> {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    private String name;

    private String description;

    private LocalDate todoDate, dueDate;

    // Effort in minutes
    private Integer effort, progress = 0;

    @ManyToOne
    private Subject subject;

    //region constructors

    public Task(String name, String description, LocalDate todoDate, LocalDate dueDate,
                Integer effort, Integer progress, Subject subject) {
        this.name = name;
        this.description = description;
        this.todoDate = todoDate;
        this.dueDate = dueDate;
        this.effort = effort;
        this.progress = progress;
        this.subject = subject;
    }

    public Task() {
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getTodoDate() {
        return todoDate;
    }

    public void setTodoDate(LocalDate todoDate) {
        this.todoDate = todoDate;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public Integer getEffort() {
        return effort;
    }

    public void setEffort(Integer effort) {
        this.effort = effort;
    }

    public Integer getProgress() {
        return progress;
    }

    public void setProgress(Integer progress) {
        this.progress = progress;
    }

    public Subject getSubject() {
        return subject;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Task)) return false;

        Task task = (Task) o;

        if (!getId().equals(task.getId())) return false;
        if (getName() != null ? !getName().equals(task.getName()) : task.getName() != null)
            return false;
        if (getDescription() != null ? !getDescription().equals(task.getDescription()) : task.getDescription() != null)
            return false;
        if (getTodoDate() != null ? !getTodoDate().equals(task.getTodoDate()) : task.getTodoDate() != null)
            return false;
        if (getDueDate() != null ? !getDueDate().equals(task.getDueDate()) : task.getDueDate() != null)
            return false;
        if (getEffort() != null ? !getEffort().equals(task.getEffort()) : task.getEffort() != null)
            return false;
        if (getProgress() != null ? !getProgress().equals(task.getProgress()) : task.getProgress() != null)
            return false;
        return getSubject() != null ? getSubject().equals(task.getSubject()) : task.getSubject() == null;

    }

    @Override
    public int hashCode() {
        int result = getId().hashCode();
        result = 31 * result + (getName() != null ? getName().hashCode() : 0);
        result = 31 * result + (getDescription() != null ? getDescription().hashCode() : 0);
        result = 31 * result + (getTodoDate() != null ? getTodoDate().hashCode() : 0);
        result = 31 * result + (getDueDate() != null ? getDueDate().hashCode() : 0);
        result = 31 * result + (getEffort() != null ? getEffort().hashCode() : 0);
        result = 31 * result + (getProgress() != null ? getProgress().hashCode() : 0);
        result = 31 * result + (getSubject() != null ? getSubject().hashCode() : 0);
        return result;
    }

    @Override
    public boolean verifyOwner(String owner) {
        return false;
    }

    @Override
    public TaskDto toDto() {
        return null;
    }

    @Override
    public Mapper<TaskDto, Task> getMapper() {
        return null;
    }
    //endregion0
}
