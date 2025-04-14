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
    internal class VideoLikeRepository : IRepository<VideoLike>
    {
        private readonly YouTubeContext db;

        public VideoLikeRepository(YouTubeContext db)
        {
            this.db = db;
        }

        public async Task<IEnumerable<VideoLike>> GetAll()
        {
            return await db.VideoLikes.ToListAsync();
        }

        public async Task<VideoLike?> Get(int id)
        {
            return await db.VideoLikes.FindAsync(id);
        }

        public async Task<VideoLike?> Get(params object[] keyValues)
        {
            return await db.VideoLikes.FindAsync(keyValues);
        }

        public async Task Create(VideoLike item)
        {
            await db.VideoLikes.AddAsync(item);
            await db.SaveChangesAsync();
        }

        public void Update(VideoLike item)
        {
            db.Entry(item).State = EntityState.Modified;
            db.SaveChanges();
        }

        public async Task Delete(int id)
        {
            VideoLike? videoLike = await db.VideoLikes.FindAsync(id);
            if (videoLike != null)
            {
                db.VideoLikes.Remove(videoLike);
                await db.SaveChangesAsync();
            }
        }

        public async Task Delete(params object[] keyValues)
        {
            VideoLike? videoLike = await db.VideoLikes.FindAsync(keyValues);
            if (videoLike != null)
            {
                db.VideoLikes.Remove(videoLike);
                await db.SaveChangesAsync();
            }
        }
    }

}
