package outcobra.server.model;

import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import lombok.*;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Teacher {
    @Id
    private Long id;

    @NotNull
    private String name;

    private String email;

    @ManyToOne
    private Institution institution;

    @OneToMany(mappedBy = "teacher")
    private List<Subject> subjects;
}
