using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding.Metadata;
using Microsoft.EntityFrameworkCore;
using YouTube.BLL.DTO;
using YouTube.DAL.EF;
using YouTube.DAL.Entities;

namespace YouTube.WebAPI.Controllers
{
    [Route("Videos")]
    [ApiController]
    public class VideosController : ControllerBase
    {
        private readonly YouTubeContext _context;

        public VideosController(YouTubeContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<VideoDTO>> GetVideos()
        {
            var videos = await _context.Videos
                .Include(v => v.Channel)
                .Select(v => new VideoDTO
                {
                    Id = v.Id,
                    Title = v.Title,
                    ThumbnailPath = v.ThumbnailPath,
                    UploadDate = v.UploadDate,
                    ViewCount = v.ViewCount,
                    Duration = v.Duration,
                    ChannelName = v.Channel.Name,
                    ProfilePicturePath = v.Channel.PicturePath,
                    ChannelId = v.Channel.Id,
                })
                .ToListAsync();

            return Ok(videos);
        }

        [HttpGet("{Id}")]
        public async Task<ActionResult<DetailesVideoDTO>> GetDetailedVideo(string id)
        {
            var video = await _context.Videos
                .Include(v => v.Channel)
                .Select(v => new DetailesVideoDTO
                {
                    Id = v.Id,
                    Title = v.Title,
                    Description = v.Description,
                    FilePath = v.FilePath,
                    ThumbnailPath = v.ThumbnailPath,
                    UploadDate = v.UploadDate,
                    ViewCount = v.ViewCount,
                    LikesCount = v.LikesCount,
                    ChannelName = v.Channel.Name,
                    ProfilePicturePath = v.Channel.PicturePath,
                    ChannelId = v.Channel.Id,
                })
               .FirstOrDefaultAsync(v => v.Id == id);

            return Ok(video);
        }

        [HttpGet("Channel/{channelId}")]
        public async Task<ActionResult<List<DetailesVideoDTO>>> GetVideosByChannel(string channelId)
        {
            var channelExists = await _context.Channels.AnyAsync(c => c.Id == channelId);
            if (!channelExists)
                return NotFound("Канал не найден");

            var videos = await _context.Videos
                .Where(v => v.ChannelId == channelId)
                .OrderByDescending(v => v.UploadDate)
                .Select(v => new DetailesVideoDTO
                {
                    Id = v.Id,
                    Title = v.Title,
                    Description = v.Description,
                    FilePath = v.FilePath,
                    ThumbnailPath = v.ThumbnailPath,
                    UploadDate = v.UploadDate,
                    Duration = v.Duration,
                    ViewCount = v.ViewCount,
                    LikesCount = v.LikesCount,
                    ChannelId = channelId
                })
                .ToListAsync();

            return Ok(videos);
        }

        [HttpPost("UploadThumbnail")]
        public async Task<IActionResult> UploadThumbnail(IFormFile file, [FromForm] string channelId)
        {
            if (file == null || file.Length == 0)
                return BadRequest("Файл отсутствует");

            var channel = await _context.Channels.FirstOrDefaultAsync(c => c.Id == channelId);
            if (channel == null)
                return NotFound("Канал не найден");

            var folder = "Thumbnails";
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
                using var stream = new FileStream(filePath, FileMode.Create);
                await file.CopyToAsync(stream);
            }

            var relativePath = $"/Images/{folder}/{fileName}";
            return Ok(new { path = relativePath });
        }

        [HttpPost("Create")]
        public async Task<IActionResult> CreateVideo([FromBody] VideoUploadDTO videoDTO)
        {
            var channel = await _context.Channels.FirstOrDefaultAsync(c => c.Id == videoDTO.ChannelId);
            if (channel == null)
                return NotFound("Канал не найден");

            Random random = new Random();
            var video = new Video
            {
                Id = IdGenerator.GenerateId(),
                Title = videoDTO.Title,
                FilePath = videoDTO.FilePath,
                ThumbnailPath = videoDTO.ThumbnailPath,
                UploadDate = DateTime.UtcNow,
                Description = videoDTO.Description,
                ViewCount = 0,
                LikesCount = 0,
                Duration = random.Next(120, 9999),
                ChannelId = videoDTO.ChannelId,
            };

            _context.Videos.Add(video);
            await _context.SaveChangesAsync();

            var resultDto = new VideoUploadDTO
            {
                Title = video.Title,
                FilePath = video.FilePath,
                ThumbnailPath = video.ThumbnailPath,
                Description = video.Description,
                ChannelId = video.ChannelId
            };

            return Ok(resultDto);
        }

        [HttpPut("Update")]
        public async Task<IActionResult> UpdateVideo([FromBody] VideoUpdateDTO dto)
        {
            var video = await _context.Videos.FirstOrDefaultAsync(v => v.Id == dto.Id);
            if (video == null)
                return NotFound("Видео не найдено");

            video.Title = dto.Title;
            video.ThumbnailPath = dto.ThumbnailPath;
            video.FilePath = dto.FilePath;
            video.Description = dto.Description;

            _context.Videos.Update(video);
            await _context.SaveChangesAsync();

            return Ok(video);
        }

        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteVideo(string id)
        {
            var video = await _context.Videos.FirstOrDefaultAsync(v => v.Id == id);
            if (video == null)
                return NotFound("Видео не найдено");

            _context.Videos.Remove(video);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Видео удалено" });
        }
    }
}
