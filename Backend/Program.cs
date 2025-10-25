using System.Collections.Concurrent;

var builder = WebApplication.CreateBuilder(args);

// Configure to use PORT environment variable (required for Render)
var port = Environment.GetEnvironmentVariable("PORT") ?? "5000";
builder.WebHost.UseUrls($"http://0.0.0.0:{port}");

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();

// In-memory storage
var tasks = new ConcurrentDictionary<Guid, TaskItem>();

// GET /api/tasks
app.MapGet("/api/tasks", () => tasks.Values.OrderBy(t => t.Id));

// POST /api/tasks
app.MapPost("/api/tasks", (TaskItemDto dto) =>
{
    var task = new TaskItem
    {
        Id = Guid.NewGuid(),
        Description = dto.Description,
        IsCompleted = false
    };
    tasks[task.Id] = task;
    return Results.Created($"/api/tasks/{task.Id}", task);
});

// PUT /api/tasks/{id}
app.MapPut("/api/tasks/{id}", (Guid id, TaskItemDto dto) =>
{
    if (!tasks.TryGetValue(id, out var task))
        return Results.NotFound();

    task.Description = dto.Description;
    task.IsCompleted = dto.IsCompleted;
    return Results.Ok(task);
});

// DELETE /api/tasks/{id}
app.MapDelete("/api/tasks/{id}", (Guid id) =>
{
    if (!tasks.TryRemove(id, out _))
        return Results.NotFound();

    return Results.NoContent();
});

app.Run();

public class TaskItem
{
    public Guid Id { get; set; }
    public string Description { get; set; } = string.Empty;
    public bool IsCompleted { get; set; }
}

public record TaskItemDto(string Description, bool IsCompleted);
