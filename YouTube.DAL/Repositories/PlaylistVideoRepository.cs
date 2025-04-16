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
    public class PlaylistVideoRepository : IRepository<PlaylistVideo>
    {
        private readonly YouTubeContext db;

        public PlaylistVideoRepository(YouTubeContext db)
        {
            this.db = db;
        }

        public async Task<IEnumerable<PlaylistVideo>> GetAll()
        {
            return await db.PlaylistVideos.ToListAsync();
        }

        public async Task<PlaylistVideo?> Get(object id)
        {
            return await db.PlaylistVideos.FindAsync(id);
        }

        public async Task Create(PlaylistVideo item)
        {
            await db.PlaylistVideos.AddAsync(item);
            await db.SaveChangesAsync();
        }

        public void Update(PlaylistVideo item)
        {
            db.Entry(item).State = EntityState.Modified;
            db.SaveChanges();
        }

        public async Task Delete(object id)
        {
            PlaylistVideo? playlistVideo = await db.PlaylistVideos.FindAsync(id);
            if (playlistVideo != null)
            {
                db.PlaylistVideos.Remove(playlistVideo);
                await db.SaveChangesAsync();
            }
        }
    }
}
