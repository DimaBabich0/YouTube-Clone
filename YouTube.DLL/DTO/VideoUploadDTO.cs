using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using YouTube.DAL.Entities;

namespace YouTube.BLL.DTO
{
    public class VideoUploadDTO
    {
        public string Title { get; set; }
        public string FilePath { get; set; }
        public string Description { get; set; }
        public string ThumbnailPath { get; set; }
        public string ChannelId { get; set; }
    }
}
