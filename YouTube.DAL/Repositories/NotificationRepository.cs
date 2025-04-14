using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YouTube.DAL.EF;
using YouTube.DAL.Entities;
using YouTube.DAL.Interfaces;

namespace YouTube.DAL.Repositories
{
    internal class NotificationRepository : IRepository<Notification>
    {
        private readonly YouTubeContext db;

        public NotificationRepository(YouTubeContext db)
        {
            this.db = db;
        }

        public async Task<IEnumerable<Notification>> GetAll()
        {
            return await db.Notifications.ToListAsync();
        }

        public async Task<Notification?> Get(int id)
        {
            return await db.Notifications.FindAsync(id);
        }

        public async Task<Notification?> Get(params object[] keyValues)
        {
            return await db.Notifications.FindAsync(keyValues);
        }

        public async Task Create(Notification item)
        {
            await db.Notifications.AddAsync(item);
            await db.SaveChangesAsync();
        }

        public void Update(Notification item)
        {
            db.Entry(item).State = EntityState.Modified;
            db.SaveChanges();
        }

        public async Task Delete(int id)
        {
            Notification? notification = await db.Notifications.FindAsync(id);
            if (notification != null)
            {
                db.Notifications.Remove(notification);
                await db.SaveChangesAsync();
            }
        }

        public async Task Delete(params object[] keyValues)
        {
            Notification? notification = await db.Notifications.FindAsync(keyValues);
            if (notification != null)
            {
                db.Notifications.Remove(notification);
                await db.SaveChangesAsync();
            }
        }
    }

}
