using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding.Metadata;
using Microsoft.EntityFrameworkCore;
using YouTube.BLL.DTO;
using YouTube.DAL.EF;
using YouTube.DAL.Entities;

namespace YouTube.WebAPI.Controllers
{
    [Route("Users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly YouTubeContext _context;

        public UsersController(YouTubeContext context)
        {
            _context = context;
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<UserDTO>> GetUser(string username)
        {
            if (string.IsNullOrEmpty(username))
            {
                return BadRequest(new { message = "Username is required." });
            }

            var user = await _context.Users
                .Include(u => u.Channel)
                .FirstOrDefaultAsync(u => u.ChannelId == username);

            if (user == null)
            {
                return NotFound(new { message = "User not found." });
            }

            var userDto = new UserDTO
            {
                Id = user.Channel.Id,
                Name = user.Channel.Name,
                PicturePath = user.Channel.PicturePath
            };

            return Ok(userDto);
        }
    }
}
