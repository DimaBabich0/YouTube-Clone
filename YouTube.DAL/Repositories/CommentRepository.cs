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
    internal class CommentRepository : IRepository<Comment>
    {
        private readonly YouTubeContext db;

        public CommentRepository(YouTubeContext db)
        {
            this.db = db;
        }

        public async Task<IEnumerable<Comment>> GetAll()
        {
            return await db.Comments.ToListAsync();
        }

        public async Task<Comment?> Get(int id)
        {
            return await db.Comments.FindAsync(id);
        }

        public async Task<Comment?> Get(params object[] keyValues)
        {
            return await db.Comments.FindAsync(keyValues);
        }

        public async Task Create(Comment item)
        {
            await db.Comments.AddAsync(item);
            await db.SaveChangesAsync();
        }

        public void Update(Comment item)
        {
            db.Entry(item).State = EntityState.Modified;
            db.SaveChanges();
        }

        public async Task Delete(int id)
        {
            Comment? comment = await db.Comments.FindAsync(id);
            if (comment != null)
            {
                db.Comments.Remove(comment);
                await db.SaveChangesAsync();
            }
        }

        public async Task Delete(params object[] keyValues)
        {
            Comment? comment = await db.Comments.FindAsync(keyValues);
            if (comment != null)
            {
                db.Comments.Remove(comment);
                await db.SaveChangesAsync();
            }
        }
    }

}
