using System.Security.Cryptography;
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

            var channelSettingDTO = new ChannelSettingsDTO
            {
                Id = channel.Id,
                Name = channel.Name,
                Description = channel.Description ?? "",
                PicturePath = channel.PicturePath ?? "",
                BannerPath = channel.BannerPath ?? ""
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

            var existingFileName = await MyCryptography.FindCopyOfFileAsync(uploadsFolder, file);
            
            string fileName;
            if (existingFileName != null)
            {
                fileName = existingFileName;
            }
            else
            {
                fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
                var filePath = Path.Combine(uploadsFolder, fileName);
                using var saveStream = new FileStream(filePath, FileMode.Create);
                await file.CopyToAsync(saveStream);
            }

            var relativePath = $"/Images/{folder}/{fileName}";
            return Ok(new { path = relativePath });
        }

        [HttpPut("Update")]
        public async Task<IActionResult> UpdateChannel(ChannelSettingsDTO model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (string.IsNullOrWhiteSpace(model.Name))
            {
                return BadRequest("Username is required.");
            }

            var channel = await _context.Channels.FirstOrDefaultAsync(c => c.Id == model.Id);
            if (channel == null)
                return NotFound("Channel not found.");

            channel.Name = model.Name;
            channel.Description = model.Description ?? string.Empty;
            channel.PicturePath = model.PicturePath;
            channel.BannerPath = model.BannerPath;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }

            return Ok(new { message = "Channel updated"});
        }
    }
}
