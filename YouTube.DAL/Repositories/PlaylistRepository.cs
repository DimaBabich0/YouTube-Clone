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
    public class PlaylistRepository : IRepository<Playlist>
    {
        private readonly YouTubeContext db;

        public PlaylistRepository(YouTubeContext db)
        {
            this.db = db;
        }

        public async Task<IEnumerable<Playlist>> GetAll()
        {
            return await db.Playlists.ToListAsync();
        }

        public async Task<Playlist?> Get(object id)
        {
            return await db.Playlists.FindAsync(id);
        }

        public async Task Create(Playlist item)
        {
            await db.Playlists.AddAsync(item);
            await db.SaveChangesAsync();
        }

        public void Update(Playlist item)
        {
            db.Entry(item).State = EntityState.Modified;
            db.SaveChanges();
        }

        public async Task Delete(object id)
        {
            Playlist? playlist = await db.Playlists.FindAsync(id);
            if (playlist != null)
            {
                db.Playlists.Remove(playlist);
                await db.SaveChangesAsync();
            }
        }
    }
}
