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
        public async Task<ActionResult<UserDTO>> GetVideos()
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
                    ProfilePicturePath = v.Channel.ProfilePicturePath
                })
                .ToListAsync();

            return Ok(videos);
        }
    }
}
