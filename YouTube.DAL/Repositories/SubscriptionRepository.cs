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
    internal class SubscriptionRepository : IRepository<Subscription>
    {
        private readonly YouTubeContext db;

        public SubscriptionRepository(YouTubeContext db)
        {
            this.db = db;
        }

        public async Task<IEnumerable<Subscription>> GetAll()
        {
            return await db.Subscriptions.ToListAsync();
        }

        public async Task<Subscription?> Get(int id)
        {
            return await db.Subscriptions.FindAsync(id);
        }

        public async Task<Subscription?> Get(params object[] keyValues)
        {
            return await db.Subscriptions.FindAsync(keyValues);
        }

        public async Task Create(Subscription item)
        {
            await db.Subscriptions.AddAsync(item);
            await db.SaveChangesAsync();
        }

        public void Update(Subscription item)
        {
            db.Entry(item).State = EntityState.Modified;
            db.SaveChanges();
        }

        public async Task Delete(int id)
        {
            Subscription? subscription = await db.Subscriptions.FindAsync(id);
            if (subscription != null)
            {
                db.Subscriptions.Remove(subscription);
                await db.SaveChangesAsync();
            }
        }

        public async Task Delete(params object[] keyValues)
        {
            Subscription? subscription = await db.Subscriptions.FindAsync(keyValues);
            if (subscription != null)
            {
                db.Subscriptions.Remove(subscription);
                await db.SaveChangesAsync();
            }
        }
    }

}
