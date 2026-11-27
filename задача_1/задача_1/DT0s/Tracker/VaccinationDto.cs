namespace задача_1.DT0s.Tracker
{
    public class VaccinationDto
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public DateTime DateAdministered { get; set; }
        public DateTime? NextDueDate { get; set; }
        public string? Notes { get; set; }
    }
    public class CreateVaccinationDto
    {
        public required string Title { get; set; }
        public DateTime DateAdministered { get; set; }
        public DateTime? NextDueDate { get; set; }
        public string? Notes { get; set; }
    }
}
