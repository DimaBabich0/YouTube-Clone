using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace YouTube.DAL.Entities
{
    public class Playlist
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateOnly LastUpdateDate { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public ICollection<PlaylistVideo> PlaylistVideos { get; set; }
    }
}
