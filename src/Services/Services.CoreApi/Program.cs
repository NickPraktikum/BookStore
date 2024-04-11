using System.Reflection;
using System.Text.Json;
using System.Text.Json.Serialization;

using devdeer.BookStore.Data.Contexts.v1;
using devdeer.BookStore.Data.Interceptors;
using devdeer.BookStore.Logic.Core;
using devdeer.BookStore.Logic.Interfaces;
using devdeer.BookStore.Logic.Mappings;
using devdeer.BookStore.Logic.Repositories;
using devdeer.BookStore.Services.CoreApi.Middlewares;

using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var policyName = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers().AddJsonOptions(
    opt =>
    {
        opt.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });
builder.Services.AddAutoMapper(typeof(BookMapping).Assembly, typeof(AuthorMapping).Assembly);
builder.Services.AddCors(
    options =>
    {
        options.AddPolicy(
            policyName,
            b =>
            {
                b.WithOrigins("localhost:3000")
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            });
    });
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(
    options =>
    {
        options.SwaggerDoc(
            "v1",
            new OpenApiInfo
            {
                Version = "v1",
                Title = "Nick's BookStore API",
                Description = "An API for my book store UI.",
                Contact = new OpenApiContact
                {
                    Name = "Contact me",
                    Url = new Uri("https://devdeer.com")
                }
            });
        var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
        options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));
    });
builder.Services.AddSwaggerGen();
builder.Services.AddTransient<IBookStoreLogic, BookStoreLogic>();
builder.Services.AddTransient<IBookStoreRepository, BookStoreRepository>();
builder.Services.AddTransient<IVersionDisplayRepository, VersionDisplayRepository>();
builder.Services.AddTransient<ErrorMiddleware>();
builder.Services.AddDbContext<BookStoreContext>(
    (services, options) =>
    {
        var configuration = services.GetRequiredService<IConfiguration>();
        var connectionString = configuration.GetConnectionString("Library");
        options.AddInterceptors(new SoftDeleteInterceptor())
            .AddInterceptors(new UpdateVersionInterceptor());
        options.UseSqlServer(
            connectionString,
            sqlServerOptions =>
            {
                sqlServerOptions.MigrationsHistoryTable("MigrationHistory", "SystemData");
                sqlServerOptions.CommandTimeout(20);
            });
    });
var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(policyName);
app.UseAuthorization();
app.UseMiddleware<ErrorMiddleware>();
app.MapControllers();
app.Run();