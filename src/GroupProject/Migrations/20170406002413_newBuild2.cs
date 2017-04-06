using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace GroupProject.Migrations
{
    public partial class newBuild2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EndDate",
                table: "EventMeetUps");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "EventMeetUps");

            migrationBuilder.DropColumn(
                name: "StartDate",
                table: "EventMeetUps");

            migrationBuilder.AddColumn<DateTime>(
                name: "End",
                table: "EventMeetUps",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "Start",
                table: "EventMeetUps",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "EventMeetUps",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "End",
                table: "EventMeetUps");

            migrationBuilder.DropColumn(
                name: "Start",
                table: "EventMeetUps");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "EventMeetUps");

            migrationBuilder.AddColumn<DateTime>(
                name: "EndDate",
                table: "EventMeetUps",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "EventMeetUps",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "StartDate",
                table: "EventMeetUps",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
