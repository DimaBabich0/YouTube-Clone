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

        [HttpGet("{username}")]
        public async Task<ActionResult<ChannelDTO>> GetChannel(string username)
        {
            if (string.IsNullOrEmpty(username))
            {
                return BadRequest(new { message = "Username is required." });
            }

            var channel = await _context.Channels
                .Include(c => c.Videos)
                //.Include(c => c.Playlists)
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
                BannerPath = channel.BannerPath,
                SubscriberCount = channel.SubscriberCount,
                CreatedDate = channel.CreatedDate,
                //Playlists = new List<Playlist>(),
                Videos = channel.Videos.Select(v => new VideoDTO
                {
                    Id = v.Id,
                    Title = v.Title,
                    ThumbnailPath = v.ThumbnailPath,
                    ChannelId = v.ChannelId,
                    ChannelName = channel.Name,
                    ProfilePicturePath = channel.PicturePath,
                    UploadDate = v.UploadDate,
                    ViewCount = v.ViewCount,
                    Duration = v.Duration
                }).ToList()
            };

            return Ok(channelSettingDTO);
        }
    }
}
