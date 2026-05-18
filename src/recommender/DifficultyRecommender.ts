import { AnalysisReport, Recommendation, DensitySection } from '../types';

export class DifficultyRecommender {
  private report: AnalysisReport;

  constructor(report: AnalysisReport) {
    this.report = report;
  }

  getRecommendations(): Recommendation[] {
    const recommendations: Recommendation[] = [];

    // Check for difficulty spikes
    recommendations.push(...this.detectSpikes());

    // Check for pacing issues
    recommendations.push(...this.detectPacingIssues());

    // Check for jarring transitions
    recommendations.push(...this.detectJarringTransitions());

    return recommendations;
  }

  private detectSpikes(): Recommendation[] {
    const recommendations: Recommendation[] = [];
    const threshold = this.report.averageDensity * 1.5;

    for (let i = 0; i < this.report.sections.length; i++) {
      const section = this.report.sections[i];
      if (section.density > threshold) {
        recommendations.push({
          severity: 'high',
          section,
          message: `⚠️  Difficulty spike detected at ${section.startTime.toFixed(1)}s`,
          suggestion: 'Consider spreading notes or reducing density in this section'
        });
      }
    }

    return recommendations;
  }

  private detectPacingIssues(): Recommendation[] {
    const recommendations: Recommendation[] = [];
    const threshold = this.report.averageDensity * 0.5;

    for (let i = 0; i < this.report.sections.length; i++) {
      const section = this.report.sections[i];
      if (section.density < threshold && section.noteCount > 0) {
        recommendations.push({
          severity: 'low',
          section,
          message: `💤 Low pacing at ${section.startTime.toFixed(1)}s`,
          suggestion: 'Consider adding more notes for better flow'
        });
      }
    }

    return recommendations;
  }

  private detectJarringTransitions(): Recommendation[] {
    const recommendations: Recommendation[] = [];

    for (let i = 1; i < this.report.sections.length; i++) {
      const prev = this.report.sections[i - 1];
      const curr = this.report.sections[i];
      const change = Math.abs(curr.density - prev.density);
      const changePercent = (change / prev.density) * 100;

      if (changePercent > 100 && change > 2) {
        recommendations.push({
          severity: 'medium',
          section: curr,
          message: `🔄 Jarring transition at ${curr.startTime.toFixed(1)}s (${changePercent.toFixed(0)}% change)`,
          suggestion: 'Gradually increase or decrease note density instead of sudden jumps'
        });
      }
    }

    return recommendations;
  }
}
