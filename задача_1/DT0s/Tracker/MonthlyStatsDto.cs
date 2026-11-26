namespace задача_1.DT0s.Tracker
{
    public class MonthlyStatsDto
    {
        public int Year { get; set; }
        public int Month { get; set; }
        public int TotalDaysTracked { get; set; } 
        public double MorningWalkCompletionPercentage { get; set; }
        public double EveningWalkCompletionPercentage { get; set; }
        public double MorningFeedCompletionPercentage { get; set; }
        public double EveningFeedCompletionPercentage { get; set; }
        public double OverallCompletionPercentage { get; set; }
    }
}
