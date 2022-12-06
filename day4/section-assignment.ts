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
}
