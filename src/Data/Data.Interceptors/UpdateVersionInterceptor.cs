namespace devdeer.BookStore.Data.Interceptors
{
    using devdeer.BookStore.Logic.Models;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Diagnostics;
    /// <summary>
    /// The interceptor that provides the update version functionality on entities.
    /// </summary>
    public class UpdateVersionInterceptor : SaveChangesInterceptor
    {
        public override InterceptionResult<int> SavingChanges(
       DbContextEventData eventData,
       InterceptionResult<int> result)
        {
            var modifiedEntries = eventData.Context!.ChangeTracker.Entries()
                .Where(entry => entry.State == EntityState.Modified | entry.State == EntityState.Deleted);

            foreach (var entry in modifiedEntries)
            {
                if (entry.Entity is IVersioned versionedEntity)
                {
                    versionedEntity.Version++;
                }
            }
            return result;
        }
        public override async ValueTask<InterceptionResult<int>> SavingChangesAsync(DbContextEventData eventData, InterceptionResult<int> result, CancellationToken cancellationToken = default)
        {
            var modifiedEntries = eventData.Context!.ChangeTracker.Entries()
                .Where(entry => entry.State == EntityState.Modified | entry.State == EntityState.Deleted);

            foreach (var entry in modifiedEntries)
            {
                if (entry.Entity is IVersioned versionedEntity)
                {
                    versionedEntity.Version++;
                }
            }

            await Task.CompletedTask;
            return result;
        }
    }
}
