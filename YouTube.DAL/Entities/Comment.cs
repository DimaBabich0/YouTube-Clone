using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace YouTube.DAL.Entities
{
    public class Comment
    {
        public int Id { get; set; }

        public string Text { get; set; }

        public DateTime CreatedDate { get; set; }

        public string VideoId { get; set; }
        public Video Video { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public int? ParentCommentId { get; set; }
        [ForeignKey("ParentCommentId")]
        public Comment ParentComment { get; set; }

        public ICollection<Comment> Replies { get; set; } = new List<Comment>();
    }
}
