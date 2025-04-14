using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace YouTube.DAL.Entities
{
    public class Subscription
    {
        public int Id { get; set; }
        public DateOnly SubscriptionDate { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public int ChannelId { get; set; }
        public Channel Channel { get; set; }
    }
}
