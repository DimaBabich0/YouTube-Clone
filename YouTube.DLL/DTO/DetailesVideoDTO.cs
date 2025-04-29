using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace YouTube.BLL.DTO
{
    public class DetailesVideoDTO
    {
       
            public string Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string FilePath { get; set; }
            public string ThumbnailPath { get; set; }
            public string ChannelName { get; set; }
            public DateTime UploadDate { get; set; }
            public int ViewCount { get; set; }
            public int LikesCount { get; set; }
            public string ProfilePicturePath { get; set; }
        

    }
}
