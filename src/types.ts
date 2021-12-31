export interface MoodOptionType {
  emoji: string;
  description: string;
}

export interface MoodOptionWithTimestamp {
  mood: MoodOptionType;
  timestamp: number;
}
