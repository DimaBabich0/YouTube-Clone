using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace YouTube.DAL.Entities
{
    public class Video
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string FilePath { get; set; }
        public string ThumbnailPath { get; set; }
        public DateTime UploadDate { get; set; }
        public int Duration { get; set; }
        public int ViewCount { get; set; }
        public int LikesCount { get; set; }

        public int ChannelId { get; set; }
        public Channel Channel { get; set; }

        public ICollection<Comment> Comments { get; set; }
    }
}
