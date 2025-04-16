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
    public class ChannelRepository : IRepository<Channel>
    {
        private readonly YouTubeContext db;

        public ChannelRepository(YouTubeContext db)
        {
            this.db = db;
        }

        public async Task<IEnumerable<Channel>> GetAll()
        {
            return await db.Channels.ToListAsync();
        }

        public async Task<Channel?> Get(object id)
        {
            return await db.Channels.FindAsync(id);
        }

        public async Task<Channel?> Get(params object[] keyValues)
        {
            return await db.Channels.FindAsync(keyValues);
        }

        public async Task Create(Channel item)
        {
            await db.Channels.AddAsync(item);
            await db.SaveChangesAsync();
        }

        public void Update(Channel item)
        {
            db.Entry(item).State = EntityState.Modified;
            db.SaveChanges();
        }

        public async Task Delete(object id)
        {
            Channel? channel = await db.Channels.FindAsync(id);
            if (channel != null)
            {
                db.Channels.Remove(channel);
                await db.SaveChangesAsync();
            }
        }
    }
}
