namespace задача_1.Models
{
    public class Meal
    {
        public int Id { get; set; }
        public int PetId { get; set; }
        public DateTime Date { get; set; }
        public required string FoodType { get; set; }
        public int AmountGrams { get; set; }
        public bool IsCompleted { get; set; } = false;
    }
}
