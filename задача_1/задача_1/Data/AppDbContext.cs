using System.Reflection.Emit;
using Microsoft.EntityFrameworkCore;
using задача_1.Models;
namespace задача_1.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<Pet> Pets { get; set; }
        public DbSet<Vaccination> Vaccinations { get; set; }
        public DbSet<Treatment> Treatments { get; set; }
        public DbSet<Walk> Walks { get; set; }
        public DbSet<Meal> Meals { get; set; }
        public DbSet<DailyTracker> DailyTrackers { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Vaccination>()
                .HasOne<Pet>()
                .WithMany()
                .HasForeignKey(v => v.PetId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Treatment>()
                .HasOne<Pet>()
                .WithMany()
                .HasForeignKey(t => t.PetId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Walk>()
                .HasOne<Pet>()
                .WithMany()
                .HasForeignKey(w => w.PetId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Meal>()
                .HasOne<Pet>()
                .WithMany()
                .HasForeignKey(m => m.PetId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<DailyTracker>()
                .HasOne<Pet>()
                .WithMany()
                .HasForeignKey(d => d.PetId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Pet>().HasData(
                new Pet { Id = 1, Name = "Бобик" }
            );
            modelBuilder.Entity<Vaccination>().HasData(
                new Vaccination
                {
                    Id = 1,
                    PetId = 1,
                    Title = "Вакцина від сказу",
                    DateAdministered = new DateTime(2023, 10, 15),
                    Notes = "Планова щорічна вакцинація"
                }
            );
            modelBuilder.Entity<Walk>().HasData(
                new Walk
                {
                    Id = 1,
                    PetId = 1,
                    Date = new DateTime(2024, 5, 20, 14, 30, 0),
                    DurationMinutes = 45,
                    Notes = "Активна прогулянка в парку"
                }
            );
        }
    }
}