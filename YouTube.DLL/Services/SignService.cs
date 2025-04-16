using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using YouTube.BLL.DTO;
using YouTube.BLL.Interfaces;
using YouTube.DAL.Entities;
using YouTube.DAL.Interfaces;

namespace YouTube.BLL.Services
{
    public class SignService : ISignService
    {
        IUnitOfWork _database { get; set; }
        public SignService(IUnitOfWork database)
        {
            _database = database;
        }

        //public Task<ActionResult<User>> CheckLogIn(UserSignInDTO dto)
        //{
            
        //}

        //public Task<ActionResult<User>> Registration(UserSignUpDTO dto)
        //{
            
        //}
    }
}
