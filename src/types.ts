export interface Note {
  time: number;
  lineIndex: number;
  lineLayer: number;
  type: number;
  cutDirection: number;
}

export interface Obstacle {
  time: number;
  lineIndex: number;
  duration: number;
  width: number;
}

export interface DifficultyData {
  notes: Note[];
  obstacles: Obstacle[];
  duration: number;
  bpm: number;
}

export interface DensitySection {
  startTime: number;
  endTime: number;
  noteCount: number;
  density: number; // notes per second
  difficulty: string;
}

export interface AnalysisReport {
  sections: DensitySection[];
  averageDensity: number;
  maxDensity: number;
  minDensity: number;
  totalNotes: number;
  mapDuration: number;
}

export interface Recommendation {
  severity: 'low' | 'medium' | 'high';
  section: DensitySection;
  message: string;
  suggestion: string;
}
