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
    public class VideoLikeRepository : IRepository<VideoLike>
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

        public async Task<VideoLike?> Get(object id)
        {
            return await db.VideoLikes.FindAsync(id);
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

        public async Task Delete(object id)
        {
            VideoLike? videoLike = await db.VideoLikes.FindAsync(id);
            if (videoLike != null)
            {
                db.VideoLikes.Remove(videoLike);
                await db.SaveChangesAsync();
            }
        }
    }
}
