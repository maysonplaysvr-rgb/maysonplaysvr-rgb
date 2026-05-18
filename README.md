# Chromapper Note Density Analyzer Plugin

🎮 A powerful Chromapper plugin that analyzes note density and provides intelligent recommendations for difficulty balancing in Beat Saber maps.

## Features

✨ **Comprehensive Analysis**
- Breaks maps into 1-second sections
- Calculates note density (notes per second)
- Auto-assigns difficulty ratings (Easy → ExpertPlus)

🎯 **Intelligent Recommendations**
- **Spike Detection** - Identifies jarring difficulty spikes
- **Pacing Analysis** - Detects sections that might feel empty
- **Transition Detection** - Finds abrupt shifts in intensity

📊 **Beautiful Reports**
- Formatted analysis with detailed metrics
- Severity-based recommendations
- Actionable suggestions for improvement

## Installation

```bash
npm install
```

## Usage

```typescript
import plugin from 'chromapper-note-density-analyzer';

const mapData = {
  notes: [...],
  obstacles: [...],
  duration: 120,
  bpm: 140
};

const results = plugin.analyze(mapData);
console.log(results);
```

## Building

```bash
npm run build      # Compile TypeScript
npm run dev        # Watch mode
npm run clean      # Remove build files
```

## Output Format

### Analysis Report

```typescript
{
  sections: [
    {
      startTime: 0,
      endTime: 1,
      noteCount: 5,
      density: 5,
      difficulty: "Hard"
    },
    // ...
  ],
  averageDensity: 4.2,
  maxDensity: 8.5,
  minDensity: 1.2,
  totalNotes: 504,
  mapDuration: 120
}
```

### Recommendations

```typescript
[
  {
    severity: "high",
    section: {...},
    message: "⚠️  Difficulty spike detected at 45.2s",
    suggestion: "Consider spreading notes or reducing density in this section"
  },
  // ...
]
```

## Difficulty Ratings

- **Easy**: < 2 notes/sec
- **Normal**: 2-4 notes/sec
- **Hard**: 4-6 notes/sec
- **Expert**: 6-8 notes/sec
- **ExpertPlus**: > 8 notes/sec

## License

MIT License - Feel free to use and modify!

## Support

For issues or suggestions, please open an issue on the GitHub repository.
