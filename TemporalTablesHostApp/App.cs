namespace TemporalTablesHostApp
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Logging;
    using TemporalTablesHostApp.Data;
    using TemporalTablesHostApp.Models;
    public class App
    {
        private readonly ILogger<App> _logger;
        private readonly BookContext _context;

        public App(ILogger<App> logger, BookContext bookContext)
        {
            _logger = logger;
            _context = bookContext;
        }

        public async Task<int> StartAsync(string[] args)
        {
           var todos = await _context.Todos.ToArrayAsync();
            return 0;
        }
    }
}