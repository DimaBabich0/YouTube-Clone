using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace YouTube.BLL.DTO
{
    public class UserSignUpDTO
    {
        [Required(ErrorMessage = "Username is required.")]
        [StringLength(20, MinimumLength = 3, ErrorMessage = "Username must be between 3 and 20 characters.")]
        [RegularExpression(@"^(?!.*[._-]{2})(?![._-])(?!.*[._-]$)[a-zA-Z0-9._-]+$",
        ErrorMessage = "Username can only contain letters, numbers, underscores, periods, and dashes, without consecutive or trailing special characters.")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email format.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required.")]
        [StringLength(20, MinimumLength = 8, ErrorMessage = "Password must be between 8 and 20 characters.")]
        public string Password { get; set; }
    }
}
