using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace YouTube.DAL.Entities
{
    public class PlaylistVideo
    {
        [Key]
        public int Id { get; set; }

        public int PlaylistId { get; set; }
        public Playlist Playlist { get; set; }

        public string VideoId { get; set; }
        public Video Video { get; set; }
    }
}
