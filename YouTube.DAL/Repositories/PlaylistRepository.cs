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
    internal class PlaylistRepository : IRepository<Playlist>
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

        public async Task<Playlist?> Get(int id)
        {
            return await db.Playlists.FindAsync(id);
        }

        public async Task<Playlist?> Get(params object[] keyValues)
        {
            return await db.Playlists.FindAsync(keyValues);
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

        public async Task Delete(int id)
        {
            Playlist? playlist = await db.Playlists.FindAsync(id);
            if (playlist != null)
            {
                db.Playlists.Remove(playlist);
                await db.SaveChangesAsync();
            }
        }

        public async Task Delete(params object[] keyValues)
        {
            Playlist? playlist = await db.Playlists.FindAsync(keyValues);
            if (playlist != null)
            {
                db.Playlists.Remove(playlist);
                await db.SaveChangesAsync();
            }
        }
    }

}
