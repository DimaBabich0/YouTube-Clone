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
    public class VideoRepository : IRepository<Video>
    {
        private readonly YouTubeContext db;

        public VideoRepository(YouTubeContext db)
        {
            this.db = db;
        }

        public async Task<IEnumerable<Video>> GetAll()
        {
            return await db.Videos.ToListAsync();
        }

        public async Task<Video?> Get(object id)
        {
            return await db.Videos.FindAsync(id);
        }

        public async Task Create(Video item)
        {
            await db.Videos.AddAsync(item);
            await db.SaveChangesAsync();
        }

        public void Update(Video item)
        {
            db.Entry(item).State = EntityState.Modified;
            db.SaveChanges();
        }

        public async Task Delete(object id)
        {
            Video? video = await db.Videos.FindAsync(id);
            if (video != null)
            {
                db.Videos.Remove(video);
                await db.SaveChangesAsync();
            }
        }
    }
}
