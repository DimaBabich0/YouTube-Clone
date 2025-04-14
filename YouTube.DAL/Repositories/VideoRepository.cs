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
    internal class VideoRepository : IRepository<Video>
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

        public async Task<Video?> Get(int id)
        {
            return await db.Videos.FindAsync(id);
        }

        public async Task<Video?> Get(params object[] keyValues)
        {
            return await db.Videos.FindAsync(keyValues);
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

        public async Task Delete(int id)
        {
            Video? video = await db.Videos.FindAsync(id);
            if (video != null)
            {
                db.Videos.Remove(video);
                await db.SaveChangesAsync();
            }
        }

        public async Task Delete(params object[] keyValues)
        {
            Video? video = await db.Videos.FindAsync(keyValues);
            if (video != null)
            {
                db.Videos.Remove(video);
                await db.SaveChangesAsync();
            }
        }
    }

}
