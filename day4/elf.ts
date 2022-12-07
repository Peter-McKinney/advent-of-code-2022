import { SectionAssignment } from "./section-assignment";

export class Elf {
  sectionAssignment: SectionAssignment;

  constructor(sectionAssignment: SectionAssignment) {
    this.sectionAssignment = sectionAssignment;
  }

  containsElf(elf: Elf) {
    return this.sectionAssignment.containsSection(elf.sectionAssignment);
  }

  overlapsElf(elf: Elf) {
    return this.sectionAssignment.overlapsSection(elf.sectionAssignment);
  }

  public toString() {
    return `${this.sectionAssignment.lower} - ${this.sectionAssignment.upper}`;
  }
}
