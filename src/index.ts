import { NoteDensityAnalyzer } from './analyzer/NoteDensityAnalyzer';
import { DifficultyRecommender } from './recommender/DifficultyRecommender';

export { NoteDensityAnalyzer, DifficultyRecommender };

export interface ChromaMapperPlugin {
  name: string;
  version: string;
  analyze(mapData: any): any;
}

const plugin: ChromaMapperPlugin = {
  name: 'chromapper-note-density-analyzer',
  version: '1.0.0',
  analyze(mapData) {
    const analyzer = new NoteDensityAnalyzer(mapData);
    const report = analyzer.generateReport();
    const recommender = new DifficultyRecommender(report);
    return recommender.getRecommendations();
  }
};

export default plugin;
