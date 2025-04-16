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
        public string Username { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string Salt { get; set; }

        public int? ChannelId { get; set; }
        public Channel? Channel { get; set; }

        public ICollection<Subscription> Subscriptions { get; set; }
        public ICollection<VideoLike> VideoLikes { get; set; }
        public ICollection<Playlist> Playlists { get; set; }
        public ICollection<Notification> Notifications { get; set; }
    }
}
