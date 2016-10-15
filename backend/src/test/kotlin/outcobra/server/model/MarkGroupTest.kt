package outcobra.server.model

import com.google.common.truth.Truth.assertThat
import org.junit.Test
import java.util.*

class MarkGroupTest {

    @Test
    fun checkWeightingSimple() {
        val mark4 = MarkValue(4.0, 1.0)
        val mark6 = MarkValue(6.0, 1.0)

        val group = MarkGroup()
        group.marks = ArrayList()

        group.addMark(mark4)
        group.addMark(mark6)

        assertThat(group.value).isWithin(0.0).of(5.0)
    }

    @Test
    fun checkWeightingComplex() {
        val mark3 = MarkValue(3.0, 2.0)
        val mark5 = MarkValue(5.0, 0.5)
        val mark6 = MarkValue(6.0, 1.0)

        val group = MarkGroup()
        group.marks = ArrayList()
        arrayOf(mark3, mark5, mark6).forEach { group.addMark(it) }

        assertThat(group.value).isWithin(0.0001).of(4.1428)
    }

    @Test
    fun checkCompositing() {
        fun addMarkTo(group: MarkGroup): (Mark) -> Unit {
            return { group.addMark(it) }
        }

        val mark1 = MarkValue(1.0, 2.0)
        val mark3 = MarkValue(3.0, 1.0)
        val mark5 = MarkValue(5.0, 1.5)

        val group1 = MarkGroup()
        group1.marks = ArrayList()
        group1.weight = 2.0
        arrayOf(mark1, mark5).forEach(addMarkTo(group1))

        assertThat(group1.value).isWithin(0.0001).of(2.7142)

        val group2 = MarkGroup()
        group2.marks = ArrayList()
        group2.weight = 1.5
        arrayOf(mark3, mark5).forEach(addMarkTo(group2))

        assertThat(group2.value).isWithin(0.0).of(4.2)

        val group3 = MarkGroup()
        group3.marks = ArrayList()
        arrayOf(group1, group2).forEach(addMarkTo(group3))

        assertThat(group3.value).isWithin(0.0001).of(3.3510)
    }
}