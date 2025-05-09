﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace YouTube.DAL.Entities
{
    public class Channel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public string? PicturePath { get; set; }
        public string? BannerPath { get; set; }
        public int SubscriberCount { get; set; }
        public DateOnly CreatedDate { get; set; }

        public ICollection<Video> Videos { get; set; } = new List<Video>();
    }
}
