namespace задача_1.Models
{
    public class Vaccination
    {
        public int Id { get; set; }
        public int PetId { get; set; }
        public required string Title { get; set; }
        public DateTime DateAdministered { get; set; }
        public DateTime? NextDueDate { get; set; }
        public string? Notes { get; set; }

    }
}
