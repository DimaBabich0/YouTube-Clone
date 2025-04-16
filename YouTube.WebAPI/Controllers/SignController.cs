using HW09.Controllers;
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
        public async Task<ActionResult<User>> SignUp(UserSignUpDTO userData)
        {
            List<User> users = await _context.Users
                .Where(u => u.Username == userData.Username)
                .ToListAsync();
            if (users.Count != 0)
            {
                return BadRequest("The user with the same name is already registered.");
            }

            string salt = MyCryptography.GetSalt();
            string hash = MyCryptography.GenerateHash(salt, userData.Password);

            var newUser = new User
            {
                Username = userData.Username,
                Email = userData.Email,
                PasswordHash = hash,
                Salt = salt
            };

            await _context.Users.AddAsync(newUser);
            await _context.SaveChangesAsync();

            return Ok(newUser);
        }

        [HttpPost("In")]
        public async Task<ActionResult<User>> SignIn(UserSignInDTO userData)
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
                return BadRequest("Invalid email or password");
            }

            var user = users.First();
            string salt = user.Salt;

            string hash = MyCryptography.GenerateHash(salt, userData.Password);
            if (user.PasswordHash != hash.ToString())
            {
                return BadRequest("Invalid email or password");
            }

            return Ok(user);
        }
    }
}
