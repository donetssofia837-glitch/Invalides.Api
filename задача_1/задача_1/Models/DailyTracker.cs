namespace задача_1.Models
{
    public class DailyTracker
    {
        public int Id { get; set; }
        public int PetId { get; set; }
        public DateTime Date { get; set; }
        public bool IsMorningWalkDone { get; set; }
        public bool IsEveningWalkDone { get; set; }
        public bool IsMorningFeedDone { get; set; }
        public bool IsEveningFeedDone { get; set; }
    }
}
