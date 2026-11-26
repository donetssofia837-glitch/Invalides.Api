namespace задача_1.Models
{
    public class Walk
    {
        public int Id { get; set; }
        public int PetId { get; set; }
        public DateTime Date { get; set; }
        public int DurationMinutes { get; set; }
        public string? Notes { get; set; }

    }
}
