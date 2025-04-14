using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace YouTube.DAL.Interfaces
{
    public interface IRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAll();
        Task<T?> Get(int id);
        Task<T?> Get(params object[] keyValues);
        Task Create(T item);
        void Update(T item);
        Task Delete(int id);
        Task Delete(params object[] keyValues);
    }
}
