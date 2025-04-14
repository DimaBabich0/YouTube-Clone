using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace YouTube.DAL.Entities
{
    public class Notification
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public DateOnly SentDate { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }
    }
}
