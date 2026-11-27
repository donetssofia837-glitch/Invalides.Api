namespace задача_1.Models
{
    public class Treatment
    {
        public int Id { get; set; }
        public int PetId { get; set; }
        public required string Type { get; set; }
        public DateTime Date { get; set; }
        public DateTime? NextDueDate { get; set; }
        public string? Notes { get; set; }
    }
}
