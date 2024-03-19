using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace App_Vapor.Migrations
{
    /// <inheritdoc />
    public partial class InitialMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Editores",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Editores", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Generos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Generos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Desarrolladoras",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EditorId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Desarrolladoras", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Desarrolladoras_Editores_EditorId",
                        column: x => x.EditorId,
                        principalTable: "Editores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Juegos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DesarrolladoraId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Juegos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Juegos_Desarrolladoras_DesarrolladoraId",
                        column: x => x.DesarrolladoraId,
                        principalTable: "Desarrolladoras",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GeneroJuego",
                columns: table => new
                {
                    GenerosId = table.Column<int>(type: "int", nullable: false),
                    JuegosId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GeneroJuego", x => new { x.GenerosId, x.JuegosId });
                    table.ForeignKey(
                        name: "FK_GeneroJuego_Generos_GenerosId",
                        column: x => x.GenerosId,
                        principalTable: "Generos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GeneroJuego_Juegos_JuegosId",
                        column: x => x.JuegosId,
                        principalTable: "Juegos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Desarrolladoras_EditorId",
                table: "Desarrolladoras",
                column: "EditorId");

            migrationBuilder.CreateIndex(
                name: "IX_GeneroJuego_JuegosId",
                table: "GeneroJuego",
                column: "JuegosId");

            migrationBuilder.CreateIndex(
                name: "IX_Juegos_DesarrolladoraId",
                table: "Juegos",
                column: "DesarrolladoraId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GeneroJuego");

            migrationBuilder.DropTable(
                name: "Generos");

            migrationBuilder.DropTable(
                name: "Juegos");

            migrationBuilder.DropTable(
                name: "Desarrolladoras");

            migrationBuilder.DropTable(
                name: "Editores");
        }
    }
}
