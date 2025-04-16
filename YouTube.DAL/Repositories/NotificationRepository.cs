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
    public class NotificationRepository : IRepository<Notification>
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

        public async Task<Notification?> Get(object id)
        {
            return await db.Notifications.FindAsync(id);
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

        public async Task Delete(object id)
        {
            Notification? notification = await db.Notifications.FindAsync(id);
            if (notification != null)
            {
                db.Notifications.Remove(notification);
                await db.SaveChangesAsync();
            }
        }
    }
}
