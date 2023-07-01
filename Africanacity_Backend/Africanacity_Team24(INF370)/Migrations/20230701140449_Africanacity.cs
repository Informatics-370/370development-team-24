using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Africanacity_Team24_INF370_.Migrations
{
    public partial class Africanacity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MenuItems_MenuItem_Categories_MenuItem_CategoryMenu_CategoryId",
                table: "MenuItems");

            migrationBuilder.DropIndex(
                name: "IX_MenuItems_MenuItem_CategoryMenu_CategoryId",
                table: "MenuItems");

            migrationBuilder.DropColumn(
                name: "MenuItem_CategoryMenu_CategoryId",
                table: "MenuItems");

            migrationBuilder.AddColumn<int>(
                name: "MenuItem_CategoryMenu_CategoryId",
                table: "MenuItem_Categories",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_MenuItem_Categories_MenuItem_CategoryMenu_CategoryId",
                table: "MenuItem_Categories",
                column: "MenuItem_CategoryMenu_CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_MenuItem_Categories_MenuItem_Categories_MenuItem_CategoryMenu_CategoryId",
                table: "MenuItem_Categories",
                column: "MenuItem_CategoryMenu_CategoryId",
                principalTable: "MenuItem_Categories",
                principalColumn: "Menu_CategoryId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MenuItem_Categories_MenuItem_Categories_MenuItem_CategoryMenu_CategoryId",
                table: "MenuItem_Categories");

            migrationBuilder.DropIndex(
                name: "IX_MenuItem_Categories_MenuItem_CategoryMenu_CategoryId",
                table: "MenuItem_Categories");

            migrationBuilder.DropColumn(
                name: "MenuItem_CategoryMenu_CategoryId",
                table: "MenuItem_Categories");

            migrationBuilder.AddColumn<int>(
                name: "MenuItem_CategoryMenu_CategoryId",
                table: "MenuItems",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_MenuItems_MenuItem_CategoryMenu_CategoryId",
                table: "MenuItems",
                column: "MenuItem_CategoryMenu_CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_MenuItems_MenuItem_Categories_MenuItem_CategoryMenu_CategoryId",
                table: "MenuItems",
                column: "MenuItem_CategoryMenu_CategoryId",
                principalTable: "MenuItem_Categories",
                principalColumn: "Menu_CategoryId");
        }
    }
}
