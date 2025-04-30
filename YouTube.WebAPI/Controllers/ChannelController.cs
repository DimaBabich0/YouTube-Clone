using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding.Metadata;
using Microsoft.EntityFrameworkCore;
using YouTube.BLL.DTO;
using YouTube.DAL.EF;
using YouTube.DAL.Entities;

namespace YouTube.WebAPI.Controllers
{
    [Route("Channels")]
    [ApiController]
    public class ChannelController : ControllerBase
    {
        private readonly YouTubeContext _context;

        public ChannelController(YouTubeContext context)
        {
            _context = context;
        }

        [HttpGet("Settings/{username}")]
        public async Task<ActionResult<ChannelSettingsDTO>> GetChannelSettings(string username)
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

            var channelSettingDTO = new ChannelSettingsDTO
            {
                Id = channel.Id,
                Name = channel.Name,
                Description = channel.Description,
                PicturePath = channel.PicturePath,
                BannerPath = channel.BannerPath
            };

            return Ok(channelSettingDTO);
        }

        [HttpPost("settings/upload")]
        public async Task<IActionResult> UploadImage(IFormFile file, [FromForm] string type, [FromForm] string channelId)
        {
            Console.WriteLine($"aaaaaaaaaa: {channelId}");
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

        [HttpPut("Settings/update")]
        public async Task<IActionResult> UpdateChannel([FromBody] ChannelSettingsDTO model)
        {
            var channel = await _context.Channels.FirstOrDefaultAsync(c => c.Id == model.Id);
            if (channel == null)
                return NotFound("Канал не найден");

            channel.Name = model.Name;
            channel.Description = model.Description;

            await _context.SaveChangesAsync();

            return Ok("Канал обновлён");
        }
    }
}
