namespace devdeer.BookStore.Services.CoreApi.Middlewares
{
    using System.Text.Json;
    using Logic.Common.Exceptions;
    /// <summary>
    /// A middleware intended to handle error requests from the logic.
    /// </summary>
    public class ErrorMiddleware : IMiddleware
    {
        /// <inheritdoc />
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                if (ex is EntityNotFoundException)
                {
                    context.Response.StatusCode = 404;
                    context.Response.ContentType = "application/json";
                    var errorResponse = JsonSerializer.Serialize(ex.Message);
                    await context.Response.WriteAsync(errorResponse);
                }
                else
                {
                    context.Response.StatusCode = 400;
                    context.Response.ContentType = "application/json";
                    var errorResponse = JsonSerializer.Serialize(ex.Message);
                    await context.Response.WriteAsync(errorResponse);
                }
            }
        }
    }
}
