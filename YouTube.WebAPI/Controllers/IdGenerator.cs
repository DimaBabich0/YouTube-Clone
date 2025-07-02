using System.Security.Cryptography;
using System.Text;

namespace YouTube.WebAPI.Controllers
{
    public static class IdGenerator
    {
        private const string Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        private static readonly RandomNumberGenerator Rng = RandomNumberGenerator.Create();
        private const int IdLength = 11;

        public static string GenerateId()
        {
            var bytes = new byte[IdLength];
            Rng.GetBytes(bytes);

            var result = new StringBuilder(IdLength);
            foreach (var b in bytes)
            {
                result.Append(Alphabet[b % Alphabet.Length]);
            }

            return result.ToString();
        }
    }
}
