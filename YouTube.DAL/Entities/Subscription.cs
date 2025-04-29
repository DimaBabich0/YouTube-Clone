using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace YouTube.DAL.Entities
{
    public class Subscription
    {
        [Key]
        public int Id { get; set; }
        public DateOnly SubscriptionDate { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }
        public User User { get; set; }

        [ForeignKey("Channel")]
        public string ChannelId { get; set; }
        public Channel Channel { get; set; }
    }
}
