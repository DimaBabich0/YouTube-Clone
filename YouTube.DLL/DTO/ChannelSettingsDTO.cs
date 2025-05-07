using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace YouTube.BLL.DTO
{
    public class ChannelSettingsDTO
    {
        public string Id { get; set; }
        [Required(ErrorMessage = "Name is required.")]
        [StringLength(20, MinimumLength = 3, ErrorMessage = "Name must be between 3 and 20 characters.")]
        [RegularExpression(@"^(?!.*[ ._-]{2})(?![ ._-])(?!.*[ ._-]$)[a-zA-Z0-9 ._-]+$",
ErrorMessage = "Username can include letters, numbers, spaces, underscores, periods, and dashes, without consecutive or trailing special characters.")]
        public string Name { get; set; }
        public string Description { get; set; }
        public string PicturePath { get; set; }
        public string BannerPath { get; set; }
    }
}
