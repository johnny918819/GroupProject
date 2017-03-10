using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using GroupProject.Services;
using GroupProject.Models;
using GroupProject.Interfaces;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace GroupProject.API
{
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private IUserServices _usrService;

        public UsersController(IUserServices usrService)
        {

            _usrService = usrService;
        }

        // GET: api/values
        [HttpGet]
        public List<ApplicationUser> Get()
        {
            return _usrService.GetUsers();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ApplicationUser Get(string id)
        {
            return _usrService.GetUser(id);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            _usrService.DeleteUser(id);
            return Ok();
        }
    }
}
