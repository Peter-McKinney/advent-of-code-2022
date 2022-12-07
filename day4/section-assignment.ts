export class SectionAssignment {
  lower: number;
  upper: number;

  constructor(lower: number, upper: number) {
    this.lower = lower;
    this.upper = upper;
  }

  containsSection(sectionAssignment: SectionAssignment) {
    return (
      this.lower <= sectionAssignment.lower &&
      this.upper >= sectionAssignment.upper
    );
  }

  overlapsSection(sectionAssignment: SectionAssignment) {
    return (
      (this.lower <= sectionAssignment.lower &&
        this.upper >= sectionAssignment.upper) ||
      (sectionAssignment.lower <= this.lower &&
        sectionAssignment.upper >= this.upper) ||
      (this.lower <= sectionAssignment.upper &&
        this.upper >= sectionAssignment.upper) ||
      (this.upper >= sectionAssignment.lower &&
        this.upper <= sectionAssignment.upper)
    );
  }
}
