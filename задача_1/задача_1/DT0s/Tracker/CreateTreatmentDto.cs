namespace задача_1.DT0s.Tracker
{
    public class CreateTreatmentDto
    {
        public required string Type { get; set; }
        public DateTime Date { get; set; }
        public DateTime? NextDueDate { get; set; }
        public string? Notes { get; set; }
    }
    public class TreatmentDto
    {
        public int Id { get; set; }
        public required string Type { get; set; }
        public DateTime Date { get; set; }
        public DateTime? NextDueDate { get; set; }
        public string? Notes { get; set; }
    }
}
