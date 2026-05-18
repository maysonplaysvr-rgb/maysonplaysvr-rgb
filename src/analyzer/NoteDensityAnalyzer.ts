import { DifficultyData, DensitySection, AnalysisReport } from '../types';

export class NoteDensityAnalyzer {
  private data: DifficultyData;
  private sectionDuration: number = 1; // 1 second sections

  constructor(data: DifficultyData) {
    this.data = data;
  }

  generateReport(): AnalysisReport {
    const sections = this.analyzeSections();
    const averageDensity = sections.reduce((sum, s) => sum + s.density, 0) / sections.length;
    const maxDensity = Math.max(...sections.map(s => s.density));
    const minDensity = Math.min(...sections.map(s => s.density));

    return {
      sections,
      averageDensity,
      maxDensity,
      minDensity,
      totalNotes: this.data.notes.length,
      mapDuration: this.data.duration
    };
  }

  private analyzeSections(): DensitySection[] {
    const sections: DensitySection[] = [];
    const sectionCount = Math.ceil(this.data.duration / this.sectionDuration);

    for (let i = 0; i < sectionCount; i++) {
      const startTime = i * this.sectionDuration;
      const endTime = (i + 1) * this.sectionDuration;

      const notesInSection = this.data.notes.filter(
        note => note.time >= startTime && note.time < endTime
      );

      const density = notesInSection.length / this.sectionDuration;
      const difficulty = this.getDifficulty(density);

      sections.push({
        startTime,
        endTime,
        noteCount: notesInSection.length,
        density,
        difficulty
      });
    }

    return sections;
  }

  private getDifficulty(density: number): string {
    if (density < 2) return 'Easy';
    if (density < 4) return 'Normal';
    if (density < 6) return 'Hard';
    if (density < 8) return 'Expert';
    return 'ExpertPlus';
  }
}
