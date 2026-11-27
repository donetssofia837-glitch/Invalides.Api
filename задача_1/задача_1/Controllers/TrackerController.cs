using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using задача_1.Data;
using задача_1.DT0s.Tracker;
using задача_1.Models;

namespace задача_1.Controllers
{
    [Authorize]
    [Route("api/pets/{petId}")]
    [ApiController]
    public class TrackerController : ControllerBase
    {
        private readonly AppDbContext _context;
        public TrackerController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet("vaccinations")]
        public async Task<ActionResult<IEnumerable<VaccinationDto>>> GetVaccinations(int petId)
        {
            var vaccinations = await _context.Vaccinations
                .Where(v => v.PetId == petId)
                .Select(v => new VaccinationDto
                {
                    Id = v.Id,
                    Title = v.Title,
                    DateAdministered = v.DateAdministered,
                    NextDueDate = v.NextDueDate,
                    Notes = v.Notes
                })
                .ToListAsync();
            return Ok(vaccinations);
        }

        [HttpPost("vaccinations")]
        public async Task<ActionResult<VaccinationDto>> AddVaccination(int petId, CreateVaccinationDto dto)
        {
            var vaccination = new Vaccination
            {
                PetId = petId,
                Title = dto.Title,
                DateAdministered = dto.DateAdministered,
                NextDueDate = dto.NextDueDate,
                Notes = dto.Notes
            };
            _context.Vaccinations.Add(vaccination);
            await _context.SaveChangesAsync();

            return Ok(vaccination);
        }
        [HttpGet("treatments")]
        public async Task<ActionResult<IEnumerable<TreatmentDto>>> GetTreatments(int petId)
        {
            var treatments = await _context.Treatments
                .Where(t => t.PetId == petId)
                .Select(t => new TreatmentDto
                {
                    Id = t.Id,
                    Type = t.Type,
                    Date = t.Date,
                    NextDueDate = t.NextDueDate,
                    Notes = t.Notes
                })
                .ToListAsync();
            return Ok(treatments);
        }
        [HttpPost("treatments")]
        public async Task<ActionResult<TreatmentDto>> AddTreatment(int petId, CreateTreatmentDto dto)
        {
            var treatment = new Treatment
            {
                PetId = petId,
                Type = dto.Type,
                Date = dto.Date,
                NextDueDate = dto.NextDueDate,
                Notes = dto.Notes
            };
            _context.Treatments.Add(treatment);
            await _context.SaveChangesAsync();

            return Ok(treatment);
        }
        [HttpGet("walks")]
        public async Task<ActionResult<IEnumerable<WalkDto>>> GetWalks(int petId)
        {
            var walks = await _context.Walks
                .Where(w => w.PetId == petId)
                .Select(w => new WalkDto
                {
                    Id = w.Id,
                    Date = w.Date,
                    DurationMinutes = w.DurationMinutes,
                    Notes = w.Notes
                })
                .ToListAsync();
            return Ok(walks);
        }
        [HttpPost("walks")]
        public async Task<ActionResult<WalkDto>> AddWalk(int petId, CreateWalkDto dto)
        {
            var walk = new Walk
            {
                PetId = petId,
                Date = dto.Date,
                DurationMinutes = dto.DurationMinutes,
                Notes = dto.Notes
            };
            _context.Walks.Add(walk);
            await _context.SaveChangesAsync();
            return Ok(walk);
        }
        [HttpGet("meals")]
        public async Task<ActionResult<IEnumerable<MealDto>>> GetMeals(int petId)
        {
            var meals = await _context.Meals
                .Where(m => m.PetId == petId)
                .Select(m => new MealDto
                {
                    Id = m.Id,
                    Date = m.Date,
                    FoodType = m.FoodType,
                    AmountGrams = m.AmountGrams,
                    IsCompleted = m.IsCompleted
                })
                .ToListAsync();
            return Ok(meals);
        }
        [HttpPost("meals")]
        public async Task<ActionResult<MealDto>> AddMeal(int petId, CreateMealDto dto)
        {
            var meal = new Meal
            {
                PetId = petId,
                Date = dto.Date,
                FoodType = dto.FoodType,
                AmountGrams = dto.AmountGrams,
                IsCompleted = dto.IsCompleted
            };
            _context.Meals.Add(meal);
            await _context.SaveChangesAsync();
            return Ok(meal);
        }
        [HttpGet("tracker")]
        public async Task<ActionResult<DailyTrackerDto>> GetDailyTracker(int petId, [FromQuery] DateTime date)
        {
            var tracker = await _context.DailyTrackers
                .FirstOrDefaultAsync(t => t.PetId == petId && t.Date.Date == date.Date);
            if (tracker == null)
            {
                tracker = new DailyTracker
                {
                    PetId = petId,
                    Date = date.Date,
                    IsMorningWalkDone = false,
                    IsEveningWalkDone = false,
                    IsMorningFeedDone = false,
                    IsEveningFeedDone = false
                };
                _context.DailyTrackers.Add(tracker);
                await _context.SaveChangesAsync(); 
            }
            var dto = new DailyTrackerDto
            {
                Date = tracker.Date,
                IsMorningWalkDone = tracker.IsMorningWalkDone,
                IsEveningWalkDone = tracker.IsEveningWalkDone,
                IsMorningFeedDone = tracker.IsMorningFeedDone,
                IsEveningFeedDone = tracker.IsEveningFeedDone
            };
            return Ok(dto);
        }
        [HttpPost("tracker")]
        public async Task<ActionResult> UpdateDailyTracker(int petId, [FromBody] DailyTrackerDto dto)
        {
            var tracker = await _context.DailyTrackers
                .FirstOrDefaultAsync(t => t.PetId == petId && t.Date.Date == dto.Date.Date);
            if (tracker == null)
            {
                tracker = new DailyTracker
                {
                    PetId = petId,
                    Date = dto.Date.Date
                };
                _context.DailyTrackers.Add(tracker);
            }
            tracker.IsMorningWalkDone = dto.IsMorningWalkDone;
            tracker.IsEveningWalkDone = dto.IsEveningWalkDone;
            tracker.IsMorningFeedDone = dto.IsMorningFeedDone;
            tracker.IsEveningFeedDone = dto.IsEveningFeedDone;
            await _context.SaveChangesAsync();
            return Ok(new { message = "Статуси трекера успішно збережено!" });
        }
        [HttpGet("tracker/monthly")]
        public async Task<ActionResult<MonthlyStatsDto>> GetMonthlyStats(int petId, [FromQuery] int year, [FromQuery] int month)
        {
            var trackers = await _context.DailyTrackers
                .Where(t => t.PetId == petId && t.Date.Year == year && t.Date.Month == month)
                .ToListAsync();
            var totalDays = trackers.Count;
            if (totalDays == 0)
            {
                return Ok(new MonthlyStatsDto
                {
                    Year = year,
                    Month = month,
                    TotalDaysTracked = 0
                });
            }
            var morningWalksCount = trackers.Count(t => t.IsMorningWalkDone);
            var eveningWalksCount = trackers.Count(t => t.IsEveningWalkDone);
            var morningFeedsCount = trackers.Count(t => t.IsMorningFeedDone);
            var eveningFeedsCount = trackers.Count(t => t.IsEveningFeedDone);
            var totalPossibleTasks = totalDays * 4;
            var totalCompletedTasks = morningWalksCount + eveningWalksCount + morningFeedsCount + eveningFeedsCount;
            var stats = new MonthlyStatsDto
            {
                Year = year,
                Month = month,
                TotalDaysTracked = totalDays,
                MorningWalkCompletionPercentage = Math.Round((double)morningWalksCount / totalDays * 100, 2),
                EveningWalkCompletionPercentage = Math.Round((double)eveningWalksCount / totalDays * 100, 2),
                MorningFeedCompletionPercentage = Math.Round((double)morningFeedsCount / totalDays * 100, 2),
                EveningFeedCompletionPercentage = Math.Round((double)eveningFeedsCount / totalDays * 100, 2),
                OverallCompletionPercentage = Math.Round((double)totalCompletedTasks / totalPossibleTasks * 100, 2)
            };
            return Ok(stats);

        }
        [HttpGet("reminders/today")]
        public async Task<ActionResult<IEnumerable<string>>> GetPendingTasksToday(int petId)
        {
            var today = DateTime.Today;
            var tracker = await _context.DailyTrackers
                .FirstOrDefaultAsync(t => t.PetId == petId && t.Date.Date == today);
            var pendingTasks = new List<string>();
            if (tracker == null)
            {
                pendingTasks.Add("Ранкова прогулянка");
                pendingTasks.Add("Вечірня прогулянка");
                pendingTasks.Add("Ранкове годування");
                pendingTasks.Add("Вечірнє годування");
            }
            else
            {
                if (!tracker.IsMorningWalkDone) pendingTasks.Add("Ранкова прогулянка");
                if (!tracker.IsEveningWalkDone) pendingTasks.Add("Вечірня прогулянка");
                if (!tracker.IsMorningFeedDone) pendingTasks.Add("Ранкове годування");
                if (!tracker.IsEveningFeedDone) pendingTasks.Add("Вечірнє годування");
            }
            return Ok(pendingTasks);
        }
        [HttpGet("export")]
        public async Task<ActionResult> ExportPetHistory(int petId, [FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            var walks = await _context.Walks
                .Where(w => w.PetId == petId && w.Date.Date >= startDate.Date && w.Date.Date <= endDate.Date)
                .Select(w => new { w.Date, w.DurationMinutes, w.Notes })
                .ToListAsync();
            var meals = await _context.Meals
                .Where(m => m.PetId == petId && m.Date.Date >= startDate.Date && m.Date.Date <= endDate.Date)
                .Select(m => new { m.Date, m.FoodType, m.AmountGrams })
                .ToListAsync();
            var treatments = await _context.Treatments
                .Where(t => t.PetId == petId && t.Date.Date >= startDate.Date && t.Date.Date <= endDate.Date)
                .Select(t => new { t.Date, t.Type, t.Notes })
                .ToListAsync();
            var exportData = new
            {
                PetId = petId,
                PeriodStart = startDate.ToString("yyyy-MM-dd"),
                PeriodEnd = endDate.ToString("yyyy-MM-dd"),
                TotalWalks = walks.Count,
                TotalMeals = meals.Count,
                TotalTreatments = treatments.Count,
                WalkHistory = walks,
                MealHistory = meals,
                TreatmentHistory = treatments
            };
            return Ok(exportData);
        }
    }
}