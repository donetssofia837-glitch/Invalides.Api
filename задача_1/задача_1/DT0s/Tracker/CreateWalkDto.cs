namespace задача_1.DT0s.Tracker
{
    public class CreateWalkDto
    {
        public DateTime Date { get; set; }
        public int DurationMinutes { get; set; }
        public string? Notes { get; set; }
    }
    public class WalkDto
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int DurationMinutes { get; set; }
        public string? Notes { get; set; }
    }
}
