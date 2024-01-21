using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Events",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StartTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Venue = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Latitude = table.Column<double>(type: "float", nullable: false),
                    Longitude = table.Column<double>(type: "float", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Category = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Events", x => x.Id);
                });
            Seed(migrationBuilder);
        }

        private void Seed(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
    table: "Events",
    columns: new[] { "Title", "Description", "StartTime", "EndTime", "Venue", "Address", "Latitude", "Longitude", "Price", "Category" },
    values: new object[,]
    {
        {
            "Not so Swaggy Jazz by the Waterfront",
            "Delight in the melodic tunes of live jazz as you watch the sunset by the waterfront.",
            DateTime.Parse("2024-01-21T23:50:00.000"),
            DateTime.Parse("2024-01-22T00:30:00.000"),
            "Waterfront Stage",
            "Strandvägen 1, 114 51 Stockholm, Sweden",
            59.330680,
            18.076220,
            220.00,
            "Music"
        },
        {
            "Family Fun Run",
            "Get your sneakers ready for a family-friendly 5k run around the scenic Djurgården!",
            DateTime.Parse("2024-01-20T08:00:00.000"),
            DateTime.Parse("2024-01-20T09:00:00.000"),
            "Djurgården Run Trail",
            "Djurgårdsvägen 6-16, 115 21 Stockholm, Sweden",
            59.325117,
            18.103896,
            100.00,
            "Sports"
        },
        {
            "The Winter's Tale",
            "Witness one of the most enchanting winter plays by Shakespeare at the Royal Dramatic Theatre.",
            DateTime.Parse("2024-01-20T15:30:00.000Z"),
            DateTime.Parse("2024-01-20T18:30:00.000Z"),
            "The Royal Dramatic Theatre",
            "Nybroplan, 111 47 Stockholm, Sweden",
            59.330923,
            18.076842,
            350.00,
            "Arts"
        },
        {
            "Children's Art Workshop",
            "A fun and interactive art workshop for children aged 5-10, exploring painting and sculpture.",
            DateTime.Parse("2024-01-21T10:00:00.000"),
            DateTime.Parse("2024-01-21T12:00:00.000"),
            "Stockholm Art Hub",
            "Södermalmstorg 4, 116 45 Stockholm, Sweden",
            59.319882,
            18.071957,
            150.00,
            "Family"
        }
    }
);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Events");
        }
    }
}
