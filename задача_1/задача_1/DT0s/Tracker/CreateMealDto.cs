namespace задача_1.DT0s.Tracker
{
    public class MealDto
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public required string FoodType { get; set; }
        public int AmountGrams { get; set; }
        public bool IsCompleted { get; set; }
    }
    public class CreateMealDto
    {
        public DateTime Date { get; set; }
        public required string FoodType { get; set; }
        public int AmountGrams { get; set; }
        public bool IsCompleted { get; set; } = true; 
    }
}
