using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;
using YouTube.DAL.Entities;

namespace YouTube.DAL.EF
{
    class YouTubeContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Channel> Channels { get; set; }
        public DbSet<Video> Videos { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Subscription> Subscriptions { get; set; }
        public DbSet<VideoLike> VideoLikes { get; set; }
        public DbSet<Playlist> Playlists { get; set; }
        public DbSet<PlaylistVideo> PlaylistVideos { get; set; }
        public DbSet<Notification> Notifications { get; set; }

        public YouTubeContext(DbContextOptions<YouTubeContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<VideoLike>()
                .HasKey(obj => new { obj.VideoId, obj.UserId });

            modelBuilder.Entity<Subscription>()
                .HasKey(obj => new { obj.UserId, obj.ChannelId});

            modelBuilder.Entity<PlaylistVideo>()
                .HasKey(obj => new { obj.PlaylistId, obj.VideoId });

            base.OnModelCreating(modelBuilder);
        }
    }
}
