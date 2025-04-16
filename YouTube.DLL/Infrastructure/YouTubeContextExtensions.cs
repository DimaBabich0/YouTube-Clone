using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using YouTube.DAL.EF;

namespace YouTube.BLL.Infrastructure
{
    public static class YouTubeContextExtensions
    {
        public static void AddYouTubeContext(this IServiceCollection services, string connection)
        {
            services.AddDbContext<YouTubeContext>(options => options.UseSqlServer(connection));
        }
    }
}
