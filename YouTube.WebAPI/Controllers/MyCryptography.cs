using System.Security.Cryptography;
using System.Text;

namespace YouTube.WebAPI.Controllers
{
    public class MyCryptography
    {
        static public string GetSalt()
        {
            byte[] saltbuf = new byte[16];
            RandomNumberGenerator rndNumGen = RandomNumberGenerator.Create();
            rndNumGen.GetBytes(saltbuf);
            StringBuilder salt = new StringBuilder(16);
            for (int i = 0; i < 16; i++)
            {
                salt.Append(string.Format("{0:X2}", saltbuf[i]));
            }
            return salt.ToString();
        }

        static public string GenerateHash(string salt, string password)
        {
            byte[] encodingPassword = Encoding.Unicode.GetBytes(salt + password);
            var md5 = MD5.Create();
            byte[] byteHash = md5.ComputeHash(encodingPassword);
            StringBuilder hash = new StringBuilder(byteHash.Length);
            for (int i = 0; i < byteHash.Length; i++)
            {
                hash.Append(string.Format("{0:X2}", byteHash[i]));
            }
            return hash.ToString();
        }

        public static async Task<string?> FindCopyOfFileAsync(string directoryPath, IFormFile uploadedFile)
        {
            string uploadedHash;
            using (var sha256 = SHA256.Create())
            using (var stream = uploadedFile.OpenReadStream())
            {
                var hashBytes = await sha256.ComputeHashAsync(stream);
                uploadedHash = BitConverter.ToString(hashBytes).Replace("-", "").ToLowerInvariant();
            }

            foreach (var filePath in Directory.GetFiles(directoryPath))
            {
                using var sha256 = SHA256.Create();
                using var fs = new FileStream(filePath, FileMode.Open, FileAccess.Read);
                var existingHash = await sha256.ComputeHashAsync(fs);
                var existingHashStr = BitConverter.ToString(existingHash).Replace("-", "").ToLowerInvariant();

                if (existingHashStr == uploadedHash)
                {
                    return Path.GetFileName(filePath);
                }
            }

            return null;
        }
    }
}
