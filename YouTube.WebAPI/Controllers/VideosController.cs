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
                    ProfilePicturePath = v.Channel.PicturePath
                })
               .FirstOrDefaultAsync(v => v.Id == id);

            return Ok(video);
        }
    }
}
