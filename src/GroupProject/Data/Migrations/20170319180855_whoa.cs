using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace GroupProject.Data.Migrations
{
    public partial class whoa : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "LookingFor",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProfileImage",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StatusMessage",
                table: "AspNetUsers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LookingFor",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "ProfileImage",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "StatusMessage",
                table: "AspNetUsers");
        }
    }
}
