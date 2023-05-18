using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Africanacity_Team24_INF370_.Migrations
{
    public partial class Lavania : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Employees",
                keyColumn: "EmployeeId",
                keyValue: 7,
                column: "Physical_Address",
                value: "243 Super Street ");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Employees",
                keyColumn: "EmployeeId",
                keyValue: 7,
                column: "Physical_Address",
                value: null);
        }
    }
}
