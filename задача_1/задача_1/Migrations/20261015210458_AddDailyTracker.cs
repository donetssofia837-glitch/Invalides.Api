using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace задача_1.Migrations
{
    /// <inheritdoc />
    public partial class AddDailyTracker : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DailyTrackers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    PetId = table.Column<int>(type: "INTEGER", nullable: false),
                    Date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    IsMorningWalkDone = table.Column<bool>(type: "INTEGER", nullable: false),
                    IsEveningWalkDone = table.Column<bool>(type: "INTEGER", nullable: false),
                    IsMorningFeedDone = table.Column<bool>(type: "INTEGER", nullable: false),
                    IsEveningFeedDone = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DailyTrackers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DailyTrackers_Pets_PetId",
                        column: x => x.PetId,
                        principalTable: "Pets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DailyTrackers_PetId",
                table: "DailyTrackers",
                column: "PetId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DailyTrackers");
        }
    }
}
