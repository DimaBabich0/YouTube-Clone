using YouTube.WebAPI.Controllers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding.Metadata;
using Microsoft.EntityFrameworkCore;
using YouTube.BLL.DTO;
using YouTube.DAL.EF;
using YouTube.DAL.Entities;

namespace YouTube.WebAPI.Controllers
{
    [Route("Sign")]
    [ApiController]
    public class SignController : ControllerBase
    {
        private readonly YouTubeContext _context;

        public SignController(YouTubeContext context)
        {
            _context = context;
        }

        [HttpPost("Up")]
        public async Task<ActionResult<string>> SignUp(UserSignUpDTO userData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            bool usernameExists = await _context.Channels.AnyAsync(u => u.Id == userData.Username);
            if (usernameExists)
            {
                return BadRequest(new { message = "The user with the same name is already registered." });
            }

            bool emailExists = await _context.Users.AnyAsync(u => u.Email == userData.Email);
            if (emailExists)
            {
                return BadRequest(new { message = "A user with this email already exists." });
            }

            Channel newChannel = new Channel
            {
                Id = userData.Username,
                Name = userData.Username,
                PicturePath = "/Images/ProfileImages/DefaultAvatar.png",
                BannerPath = "/Images/ProfileBanners/DefaultBanner.png",
                SubscriberCount = 0,
                CreatedDate = DateOnly.FromDateTime(DateTime.UtcNow)
            };

            await _context.Channels.AddAsync(newChannel);
            await _context.SaveChangesAsync();

            string salt = MyCryptography.GetSalt();
            string hash = MyCryptography.GenerateHash(salt, userData.Password);

            User newUser = new User
            {
                Email = userData.Email,
                PasswordHash = hash,
                Salt = salt,
                ChannelId = newChannel.Id,
                Channel = newChannel
            };

            await _context.Users.AddAsync(newUser);
            await _context.SaveChangesAsync();

            return Ok(newUser.ChannelId);
        }

        [HttpPost("In")]
        public async Task<ActionResult<string>> SignIn(UserSignInDTO userData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            List<User> users = await _context.Users
                .Where(u => u.Email == userData.Email)
                .ToListAsync();
            if (users.Count == 0)
            {
                return BadRequest(new { message = "Invalid email or password." });
            }

            var user = users.First();
            string salt = user.Salt;
            string hash = MyCryptography.GenerateHash(salt, userData.Password);
            if (user.PasswordHash != hash.ToString())
            {
                return BadRequest(new { message = "Invalid email or password." });
            }

            return Ok(user.ChannelId);
        }
    }
}
