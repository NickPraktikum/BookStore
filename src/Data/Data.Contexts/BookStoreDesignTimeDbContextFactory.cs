using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;
namespace devdeer.BookStore.Data.Contexts.v1
{
    public class BookStoreDesignTimeDbContextFactory : IDesignTimeDbContextFactory<BookStoreContext>
    {
        /// <inheritdoc />
        public BookStoreContext CreateDbContext(string[] args)
        {
            var options = new DbContextOptionsBuilder<BookStoreContext>().UseSqlServer(
                     "Data Source=.;Initial Catalog=LibraryProject;Integrated Security=False;User ID=sa;Password=Sql-Server-Dev;Encrypt=True;TrustServerCertificate=True;Application Name=EfLibraryProject",
                    o =>
                    {
                        o.MigrationsHistoryTable("MigrationHistory", "SystemData");
                        o.CommandTimeout(3600);
                    })
                .Options;
            return new BookStoreContext(options);
        }
    }
}