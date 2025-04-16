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
    public class CommentRepository : IRepository<Comment>
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

        public async Task<Comment?> Get(object id)
        {
            return await db.Comments.FindAsync(id);
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

        public async Task Delete(object id)
        {
            Comment? comment = await db.Comments.FindAsync(id);
            if (comment != null)
            {
                db.Comments.Remove(comment);
                await db.SaveChangesAsync();
            }
        }
    }
}
