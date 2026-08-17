using System.Diagnostics;

namespace EmployeeAdminPortal.Middleware
{
    public class RequestLoggingMiddleware
    {
        private readonly RequestDelegate next;
        private readonly ILogger<RequestLoggingMiddleware> logger;

        public RequestLoggingMiddleware(RequestDelegate next, ILogger<RequestLoggingMiddleware> logger)
        {
            this.next = next;
            this.logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var stopwatch = Stopwatch.StartNew();
            var method = context.Request.Method;
            var path = context.Request.Path;

            logger.LogInformation("--> {Method} {Path}", method, path);

            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                stopwatch.Stop();
                logger.LogError(ex, "<-- {Method} {Path} threw an exception after {ElapsedMs}ms", method, path, stopwatch.ElapsedMilliseconds);
                throw;
            }

            stopwatch.Stop();
            var statusCode = context.Response.StatusCode;

            if (statusCode >= 400)
            {
                logger.LogWarning("<-- {Method} {Path} responded {StatusCode} in {ElapsedMs}ms", method, path, statusCode, stopwatch.ElapsedMilliseconds);
            }
            else
            {
                logger.LogInformation("<-- {Method} {Path} responded {StatusCode} in {ElapsedMs}ms", method, path, statusCode, stopwatch.ElapsedMilliseconds);
            }
        }
    }
}
