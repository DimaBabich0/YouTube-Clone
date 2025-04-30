using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding.Metadata;
using Microsoft.EntityFrameworkCore;
using YouTube.BLL.DTO;
using YouTube.DAL.EF;
using YouTube.DAL.Entities;

namespace YouTube.WebAPI.Controllers
{
    [Route("Channels/Settings")]
    [ApiController]
    public class ChannelSettingsController : ControllerBase
    {
        private readonly YouTubeContext _context;

        public ChannelSettingsController(YouTubeContext context)
        {
            _context = context;
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<ChannelDTO>> GetChannel(string username)
        {
            if (string.IsNullOrEmpty(username))
            {
                return BadRequest(new { message = "Username is required." });
            }

            var channel = await _context.Channels
                .FirstOrDefaultAsync(c => c.Id == username);

            if (channel == null)
            {
                return NotFound(new { message = "Channel not found." });
            }

            var channelSettingDTO = new ChannelDTO
            {
                Id = channel.Id,
                Name = channel.Name,
                Description = channel.Description,
                PicturePath = channel.PicturePath,
                BannerPath = channel.BannerPath
            };

            return Ok(channelSettingDTO);
        }

        [HttpPost("Upload")]
        public async Task<IActionResult> UploadImage(IFormFile file, [FromForm] string type, [FromForm] string channelId)
        {
            if (file == null || file.Length == 0)
                return BadRequest("Файл отсутствует");

            var channel = await _context.Channels.FirstOrDefaultAsync(c => c.Id == channelId);
            if (channel == null)
                return NotFound("Канал не найден");

            string folder = type == "picture" ? "ProfileImages" : "ProfileBanners";
            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Images", folder);
            Directory.CreateDirectory(uploadsFolder);

            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
            var filePath = Path.Combine(uploadsFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var relativePath = $"/Images/{folder}/{fileName}";

            if (type == "picture")
                channel.PicturePath = relativePath;
            else if (type == "banner")
                channel.BannerPath = relativePath;
            else
                return BadRequest("Неверный тип");

            await _context.SaveChangesAsync();

            return Ok(new { path = relativePath });
        }

        [HttpPut("Update")]
        public async Task<IActionResult> UpdateChannel(ChannelDTO model)
        {
            var channel = await _context.Channels.FirstOrDefaultAsync(c => c.Id == model.Id);
            if (channel == null)
                return NotFound("Channel isn't founded");

            channel.Name = model.Name;
            channel.Description = model.Description;

            await _context.SaveChangesAsync();

            return Ok("Channel updated");
        }
    }
}
