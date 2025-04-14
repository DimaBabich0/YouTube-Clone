using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace YouTube.DAL.Entities
{
    public class VideoLike
    {
        public int UserId { get; set; }
        public User User { get; set; }

        public string VideoId { get; set; }
        public Video Video { get; set; }
    }
}
