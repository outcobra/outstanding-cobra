package outcobra.server.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;
import java.util.List;

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
