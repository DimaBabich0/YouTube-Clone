using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using YouTube.DAL.Entities;

namespace YouTube.BLL.DTO
{
    public class ChannelDTO
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public string? PicturePath { get; set; }
        public string? BannerPath { get; set; }
        public int SubscriberCount { get; set; }
        public DateOnly CreatedDate { get; set; }
        public List<VideoDTO> Videos { get; set; } = new List<VideoDTO>();
        //public List<Playlist> Playlists { get; set; } = new List<Playlist>();
    }
}
