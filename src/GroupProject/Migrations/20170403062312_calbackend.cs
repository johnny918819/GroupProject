using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace GroupProject.Migrations
{
    public partial class calbackend : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EventMeetUps",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ApplicationUserId = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    EndDate = table.Column<DateTime>(nullable: false),
                    Location = table.Column<string>(nullable: true),
                    MaxCapacity = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    StartDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventMeetUps", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EventMeetUps_AspNetUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.AddColumn<int>(
                name: "EventMeetUpId",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_EventMeetUpId",
                table: "AspNetUsers",
                column: "EventMeetUpId");

            migrationBuilder.CreateIndex(
                name: "IX_EventMeetUps_ApplicationUserId",
                table: "EventMeetUps",
                column: "ApplicationUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_EventMeetUps_EventMeetUpId",
                table: "AspNetUsers",
                column: "EventMeetUpId",
                principalTable: "EventMeetUps",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_EventMeetUps_EventMeetUpId",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_EventMeetUpId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "EventMeetUpId",
                table: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "EventMeetUps");
        }
    }
}
