package outcobra.server.model;

import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import lombok.*;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Timetable {
    @Id
    private Long id;

    @NotNull
    @OneToOne(mappedBy = "timetable")
    private Semester semester;

    @OneToMany(mappedBy = "timetable")
    private List<TimetableEntry> entries;
}
