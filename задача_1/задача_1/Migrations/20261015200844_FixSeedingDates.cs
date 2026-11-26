using System;
using Microsoft.EntityFrameworkCore.Migrations;
#nullable disable
namespace задача_1.Migrations
{
    public partial class FixSeedingDates : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Vaccinations",
                keyColumn: "Id",
                keyValue: 1,
                column: "DateAdministered",
                value: new DateTime(2023, 10, 15, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.UpdateData(
                table: "Walks",
                keyColumn: "Id",
                keyValue: 1,
                column: "Date",
                value: new DateTime(2024, 5, 20, 14, 30, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Vaccinations",
                keyColumn: "Id",
                keyValue: 1,
                column: "DateAdministered",
                value: new DateTime(2026, 9, 15, 23, 4, 40, 230, DateTimeKind.Local).AddTicks(4375));

            migrationBuilder.UpdateData(
                table: "Walks",
                keyColumn: "Id",
                keyValue: 1,
                column: "Date",
                value: new DateTime(2026, 10, 15, 21, 4, 40, 232, DateTimeKind.Local).AddTicks(2754));
        }
    }
}
