using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class SeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EndTime",
                table: "Events");

            migrationBuilder.AlterColumn<string>(
                name: "Venue",
                table: "Events",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "Events",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Events",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Category",
                table: "Events",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Address",
                table: "Events",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<int>(
                name: "Duration",
                table: "Events",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "Events",
                columns: new[] { "Id", "Address", "Category", "Description", "Duration", "Latitude", "Longitude", "Price", "StartTime", "Title", "Venue" },
                values: new object[,]
                {
                    { 1, "Strandvägen 1, 114 51 Stockholm, Sweden", "Music", "Delight in the melodic tunes of live jazz as you watch the sunset by the waterfront.", 2, 59.330680000000001, 18.076219999999999, 220.00m, new DateTime(2024, 1, 19, 17, 0, 0, 0, DateTimeKind.Local), "Jazz by the Waterfront", "Waterfront Stage" },
                    { 2, "Djurgårdsvägen 6-16, 115 21 Stockholm, Sweden", "Sports", "Get your sneakers ready for a family-friendly 5k run around the scenic Djurgården!", 2, 59.325116999999999, 18.103895999999999, 100.00m, new DateTime(2024, 1, 20, 9, 0, 0, 0, DateTimeKind.Local), "Family Fun Run", "Djurgården Run Trail" },
                    { 3, "Nybroplan, 111 47 Stockholm, Sweden", "Arts", "Witness one of the most enchanting winter plays by Shakespeare at the Royal Dramatic Theatre.", 2, 59.330922999999999, 18.076841999999999, 350.00m, new DateTime(2024, 1, 20, 16, 30, 0, 0, DateTimeKind.Local), "The Winter's Tale", "The Royal Dramatic Theatre" },
                    { 4, "Södermalmstorg 4, 116 45 Stockholm, Sweden", "Family", "A fun and interactive art workshop for children aged 5-10, exploring painting and sculpture.", 2, 59.319882, 18.071957000000001, 150.00m, new DateTime(2024, 1, 21, 11, 0, 0, 0, DateTimeKind.Local), "Children's Art Workshop", "Stockholm Art Hub" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Events",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Events",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Events",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Events",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DropColumn(
                name: "Duration",
                table: "Events");

            migrationBuilder.AlterColumn<string>(
                name: "Venue",
                table: "Events",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "Events",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Events",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Category",
                table: "Events",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Address",
                table: "Events",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "EndTime",
                table: "Events",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
