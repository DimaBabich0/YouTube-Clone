using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using YouTube.DAL.Entities;

namespace YouTube.DAL.Interfaces
{
    public interface IUnitOfWork
    {
        IRepository<User> Users { get; }
        IRepository<Channel> Channels { get; }
        IRepository<Subscription> Subscriptions { get; }
        IRepository<Video> Videos { get; }
        IRepository<Comment> Comments { get; }
        IRepository<VideoLike> VideoLikes { get; }
        IRepository<Playlist> Playlists { get; }
        IRepository<PlaylistVideo> PlaylistVideos { get; }
        IRepository<Notification> Notifications { get; }
        Task Save();
    }
}
