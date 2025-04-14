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
    internal class UserRepository : IRepository<User>
    {
        private readonly YouTubeContext db;

        public UserRepository(YouTubeContext db)
        {
            this.db = db;
        }

        public async Task<IEnumerable<User>> GetAll()
        {
            return await db.Users.ToListAsync();
        }

        public async Task<User?> Get(int id)
        {
            return await db.Users.FindAsync(id);
        }

        public async Task<User?> Get(params object[] keyValues)
        {
            return await db.Users.FindAsync(keyValues);
        }

        public async Task Create(User item)
        {
            await db.Users.AddAsync(item);
            await db.SaveChangesAsync();
        }

        public void Update(User item)
        {
            db.Entry(item).State = EntityState.Modified;
            db.SaveChanges();
        }

        public async Task Delete(int id)
        {
            User? user = await db.Users.FindAsync(id);
            if (user != null)
            {
                db.Users.Remove(user);
                await db.SaveChangesAsync();
            }
        }

        public async Task Delete(params object[] keyValues)
        {
            User? user = await db.Users.FindAsync(keyValues);
            if (user != null)
            {
                db.Users.Remove(user);
                await db.SaveChangesAsync();
            }
        }
    }
}
