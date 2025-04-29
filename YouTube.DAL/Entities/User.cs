using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace YouTube.DAL.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string Salt { get; set; }

        public string? ChannelId { get; set; }
        public Channel? Channel { get; set; }

        public ICollection<Subscription> Subscriptions { get; set; } = new List<Subscription>();
        public ICollection<VideoLike> VideoLikes { get; set; } = new List<VideoLike>();
        public ICollection<Playlist> Playlists { get; set; } = new List<Playlist>();
        public ICollection<Notification> Notifications { get; set; } = new List<Notification>();
    }
}
