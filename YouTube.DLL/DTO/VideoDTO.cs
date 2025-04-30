using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using YouTube.DAL.Entities;

namespace YouTube.BLL.DTO
{
    public class VideoDTO
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string ThumbnailPath { get; set; }
        public string ChannelName { get; set; }
        public DateTime UploadDate { get; set; }
        public int ViewCount { get; set; }
        public int Duration { get; set; }
        public string ProfilePicturePath { get; set; }
        public string ChannelId { get; set; }
    }
}
