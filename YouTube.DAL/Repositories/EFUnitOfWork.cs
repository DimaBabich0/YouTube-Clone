using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using YouTube.DAL.Entities;
using YouTube.DAL.Interfaces;
using YouTube.DAL.EF;

namespace YouTube.DAL.Repositories
{
    public class EFUnitOfWork : IUnitOfWork
    {
        private YouTubeContext db;
        public EFUnitOfWork(YouTubeContext _context)
        {
            db = _context;
        }

        private UserRepository userRepository;
        private ChannelRepository channelRepository;
        private SubscriptionRepository subscriptionRepository;
        private VideoRepository videoRepository;
        private VideoLikeRepository videoLikeRepository;
        private PlaylistVideoRepository playlistVideoRepository;
        private PlaylistRepository playlistRepository;
        private NotificationRepository notificationRepository;
        private CommentRepository commentRepository;

        public IRepository<User> Users
        {
            get
            {
                if (userRepository == null)
                    userRepository = new UserRepository(db);
                return userRepository;
            }
        }

        public IRepository<Channel> Channels
        {
            get
            {
                if (channelRepository == null)
                    channelRepository = new ChannelRepository(db);
                return channelRepository;
            }
        }

        public IRepository<Subscription> Subscriptions
        {
            get
            {
                if (subscriptionRepository == null)
                    subscriptionRepository = new SubscriptionRepository(db);
                return subscriptionRepository;
            }
        }

        public IRepository<Video> Videos
        {
            get
            {
                if (videoRepository == null)
                    videoRepository = new VideoRepository(db);
                return videoRepository;
            }
        }

        public IRepository<Comment> Comments
        {
            get
            {
                if (commentRepository == null)
                    commentRepository = new CommentRepository(db);
                return commentRepository;
            }
        }

        public IRepository<VideoLike> VideoLikes
        {
            get
            {
                if (videoLikeRepository == null)
                    videoLikeRepository = new VideoLikeRepository(db);
                return videoLikeRepository;
            }
        }

        public IRepository<Playlist> Playlists
        {
            get
            {
                if (playlistRepository == null)
                    playlistRepository = new PlaylistRepository(db);
                return playlistRepository;
            }
        }

        public IRepository<PlaylistVideo> PlaylistVideos
        {
            get
            {
                if (playlistVideoRepository == null)
                    playlistVideoRepository = new PlaylistVideoRepository(db);
                return playlistVideoRepository;
            }
        }

        public IRepository<Notification> Notifications
        {
            get
            {
                if (notificationRepository == null)
                    notificationRepository = new NotificationRepository(db);
                return notificationRepository;
            }
        }

        public async Task Save()
        {
            await db.SaveChangesAsync();
        }
    }
}
